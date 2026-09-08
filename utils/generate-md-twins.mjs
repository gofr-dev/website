#!/usr/bin/env node
// Generate a Markdown "twin" for every content route, plus scoped
// llms.txt indexes per docs section.
//
// Why: agents that land on gofr.dev from a web search get a React
// shell full of navigation chrome. A twin lets them fetch the same
// page as clean Markdown — either directly (/docs/x.md) or through
// Accept: text/markdown negotiation, which zopdev/static-server
// resolves to the `<route>.md` sibling.
//
// Output goes to public/, which Next copies verbatim into out/.
//
// IMPORTANT: docs markdown is NOT in this repo. It is layered in from
// gofr-dev/gofr by that repo's docs/Dockerfile before `npm run build`.
// A standalone build of this repo therefore emits only the handful of
// pages authored here — that is expected, not a failure.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  SECTIONS,
  SITE_URL,
  STANDALONE_PAGES,
  isExcludedRoute,
} from './lib/doc-sections.mjs'

// Hand-authored, committed files under public/ that a generated twin must
// never clobber. Kept in sync with the negations in .gitignore.
const RESERVED_PUBLIC_FILES = new Set(['index.md', 'auth.md', 'AGENTS.md'])

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const publicDir = path.join(repoRoot, 'public')

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else if (entry.name === 'page.md') acc.push(full)
  }
  return acc
}

function pageFileToRoute(absFile) {
  const rel = path
    .relative(path.join(repoRoot, 'src/app'), absFile)
    .replace(/\\/g, '/')
  const route = '/' + rel.replace(/\/?page\.md$/, '')
  return route === '/' ? '/' : route
}

// --- frontmatter -----------------------------------------------------

function splitFrontmatter(text) {
  if (!text.startsWith('---')) return { frontmatter: '', body: text }
  const end = text.indexOf('\n---', 3)
  if (end === -1) return { frontmatter: '', body: text }
  return {
    frontmatter: text.slice(3, end),
    body: text.slice(end + 4).replace(/^\n+/, ''),
  }
}

// Frontmatter here is small and hand-written (title/description plus a
// nested nextjs.metadata block). We only need the top-level title and
// description, so a two-line scan beats pulling in a YAML parser and
// beats guessing at the nested block's indentation.
function readFrontmatterField(frontmatter, field) {
  for (const line of frontmatter.split('\n')) {
    const m = line.match(new RegExp(`^${field}:\\s*(.+)$`))
    if (m) return m[1].trim().replace(/^['"]|['"]$/g, '')
  }
  return ''
}

// --- Markdoc tag rendering -------------------------------------------
//
// Twins are served as text/markdown, so `{% faq-item question="..." %}`
// would reach an agent as template noise. We render each tag down to
// plain Markdown instead.
//
// The transformation is line-based but FENCE-AWARE: a code block that
// legitimately contains `{%` (Go template examples do) must survive
// untouched. That is the single reason this isn't a bare regex.

function parseTagAttrs(body) {
  const attrs = {}
  for (const m of body.matchAll(/([\w-]+)\s*=\s*"([^"]*)"/g)) attrs[m[1]] = m[2]
  return attrs
}

// Returns the Markdown replacement for an opening/self-closing tag, or
// '' to drop the line entirely. Closing tags are always dropped.
function renderTagOpen(name, attrs) {
  switch (name) {
    case 'callout': {
      const label = attrs.type === 'warning' ? 'Warning' : 'Note'
      return attrs.title ? `**${label}: ${attrs.title}**` : `**${label}**`
    }
    case 'faq-item':
      return attrs.question ? `### ${attrs.question}` : ''
    case 'howto':
      return attrs.name ? `### ${attrs.name}` : ''
    case 'tab':
      return attrs.label ? `#### ${attrs.label}` : ''
    case 'figure':
      return attrs.src
        ? `![${attrs.alt || attrs.caption || ''}](${attrs.src})`
        : ''
    case 'quick-link':
    case 'new-tab-link':
      if (!attrs.href) return ''
      return `- [${attrs.title || attrs.href}](${attrs.href})${
        attrs.description ? ` — ${attrs.description}` : ''
      }`
    case 'section-cards':
      return ''
    default:
      // answer, faq, tabs, quick-links, section-cards: pure layout
      // wrappers. Drop the wrapper, keep whatever is inside.
      return ''
  }
}

// Same tags, but appearing mid-sentence, where a heading or a list
// item would break the prose around them.
function renderTagInline(name, attrs) {
  switch (name) {
    case 'quick-link':
    case 'new-tab-link':
      return attrs.href ? `[${attrs.title || attrs.href}](${attrs.href})` : ''
    case 'figure':
      return attrs.src ? `![${attrs.alt || ''}](${attrs.src})` : ''
    default:
      return ''
  }
}

function renderMarkdocTags(body) {
  const out = []
  let inFence = false
  let fenceMarker = ''
  // A tag's attributes can span several lines (a long `alt=` on a
  // {% figure %}, for example). Buffer those into one logical line
  // before matching, or the opening line never sees its own `%}`.
  let pending = null

  for (const rawLine of body.split('\n')) {
    let line = rawLine
    if (pending !== null) {
      pending += ' ' + line.trim()
      if (!/%\}/.test(line)) continue
      line = pending
      pending = null
    } else if (!inFence && /^\s*\{%/.test(line) && !/%\}/.test(line)) {
      pending = line.trimEnd()
      continue
    }

    const fence = line.match(/^\s*(```+|~~~+)/)
    if (fence) {
      if (!inFence) {
        inFence = true
        fenceMarker = fence[1][0]
      } else if (fence[1][0] === fenceMarker) {
        inFence = false
      }
      out.push(line)
      continue
    }
    if (inFence) {
      out.push(line)
      continue
    }

    const whole = line.match(/^\s*\{%\s*(\/?)\s*([\w-]+)([\s\S]*?)\/?%\}\s*$/)
    if (whole) {
      if (whole[1] === '/') continue // closing tag
      const replacement = renderTagOpen(whole[2], parseTagAttrs(whole[3]))
      if (replacement) out.push(replacement)
      continue
    }

    // A tag can also sit mid-sentence — `{% new-tab-link href=... /%}`
    // is used inline in prose. Deleting it silently swallows the link
    // and leaves a gap in the sentence, so render it as an inline
    // Markdown link; drop only tags that carry no content.
    out.push(
      line
        .replace(/\{%\s*\/?\s*([\w-]+)([\s\S]*?)\/?%\}/g, (_, name, rest) =>
          renderTagInline(name, parseTagAttrs(rest)),
        )
        .trimEnd(),
    )
  }

  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim()
}

// --- link rewriting ---------------------------------------------------

// An agent holding /docs/x.md has no base URL, so `../y` and `/docs/y`
// are both unresolvable. Make every internal link absolute.
//
// Fence-aware for the same reason renderMarkdocTags is: a code sample
// showing markdown syntax, or a config snippet containing `](/path)`,
// must survive verbatim. Rewriting inside a fence would silently edit
// the code a reader is meant to copy.
function absolutiseLinks(body, route) {
  const baseDir = route.replace(/\/[^/]*$/, '')

  const rewrite = (line) =>
    line.replace(/\]\(([^)\s]+)(\s+"[^"]*")?\)/g, (full, href, title) => {
      if (/^(https?:|mailto:|#|data:)/.test(href)) return full

      const abs = href.startsWith('/')
        ? href
        : path.posix.normalize(path.posix.join(baseDir, href))

      return `](${SITE_URL}${abs}${title || ''})`
    })

  const out = []
  let inFence = false
  let fenceMarker = ''

  for (const line of body.split('\n')) {
    const fence = line.match(/^\s*(```+|~~~+)/)
    if (fence) {
      if (!inFence) {
        inFence = true
        fenceMarker = fence[1][0]
      } else if (fence[1][0] === fenceMarker) {
        inFence = false
      }

      out.push(line)
      continue
    }

    out.push(inFence ? line : rewrite(line))
  }

  return out.join('\n')
}

// --- emit -------------------------------------------------------------

function collectPages() {
  const pages = []
  const seen = new Set()

  const add = (file, sectionSlug) => {
    const route = pageFileToRoute(file)
    if (isExcludedRoute(route) || seen.has(route)) return
    seen.add(route)
    pages.push({ file, route, sectionSlug })
  }

  for (const section of SECTIONS) {
    for (const file of walk(path.join(repoRoot, section.dir)).sort()) {
      add(file, section.slug)
    }
  }
  for (const rel of STANDALONE_PAGES) {
    const file = path.join(repoRoot, rel)
    if (fs.existsSync(file)) add(file, undefined)
  }

  return pages
}

function writeTwin(page) {
  const raw = fs.readFileSync(page.file, 'utf8').replace(/\r\n/g, '\n')
  const { frontmatter, body } = splitFrontmatter(raw)
  const title = readFrontmatterField(frontmatter, 'title')
  const description = readFrontmatterField(frontmatter, 'description')

  let content = absolutiseLinks(renderMarkdocTags(body), page.route)
  if (!content) return null

  // orank (and every markdown-first agent) expects the body to START
  // with a top-level heading. Most page.md files open with prose, and
  // the visible <h1> comes from frontmatter via the layout — so we
  // re-attach it here. If the body already leads with an h1, don't
  // double it up.
  // The body MUST open with a top-level heading — that is how every
  // markdown-first agent (and orank's probe) decides the response is
  // real markdown rather than a stray text file. Most page.md files
  // open with prose because the visible <h1> is rendered by the layout
  // from frontmatter, so re-attach it. When the body already leads
  // with an h1, keep that one and slot the description in beneath it
  // rather than pushing the heading off the first line.
  const parts = []
  const leadsWithH1 = /^#\s/.test(content)
  let heading = title
  if (!leadsWithH1) {
    heading = title || page.route
    parts.push(`# ${heading}`, '')
  } else {
    const [firstLine, ...rest] = content.split('\n')
    // Frontmatter `title` is optional; when it's absent the body's own
    // h1 is the page's real name. Without this, the schema feed and the
    // section indexes label the page with its raw route.
    if (!heading) heading = firstLine.replace(/^#\s*/, '').trim()
    parts.push(firstLine, '')
    content = rest.join('\n').replace(/^\n+/, '')
  }
  if (description) parts.push(`> ${description}`, '')
  parts.push(content, '', '---', '', `Source: ${SITE_URL}${page.route}`, '')

  const outFile = path.join(publicDir, `${page.route.replace(/^\//, '')}.md`)

  // Twins are gitignored, so overwriting a hand-authored file here would
  // not even show up in `git status` — the spec document would just
  // vanish from the build. Refuse instead. Today no route collides;
  // adding src/app/auth/page.md would be enough to cause it.
  if (RESERVED_PUBLIC_FILES.has(path.relative(publicDir, outFile))) {
    throw new Error(
      `[md-twins] route ${page.route} would overwrite the hand-authored ` +
        `public/${path.relative(publicDir, outFile)}. Rename the route or ` +
        `the published file.`,
    )
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, parts.join('\n'))
  return { title: heading || page.route, description }
}

// Per-section llms.txt. An agent working on, say, datasources can pull
// /docs/datasources/llms.txt instead of the whole site index.
function writeSectionIndex(section, entries) {
  if (entries.length === 0) return false
  const lines = [
    `# GoFr — ${section.label}`,
    '',
    `> Scoped index for the ${section.label} section of https://gofr.dev.`,
    '> Each entry links to the HTML page; append `.md` to any URL for the',
    '> Markdown twin, or send `Accept: text/markdown`.',
    '',
    `## ${section.label}`,
    '',
    ...entries.map(
      (e) =>
        `- [${e.title}](${SITE_URL}${e.route})${
          e.description ? `: ${e.description}` : ''
        }`,
    ),
    '',
    '## Wider context',
    '',
    `- [Full site index](${SITE_URL}/llms.txt)`,
    `- [Everything in one file](${SITE_URL}/llms-full.txt)`,
    `- [AI coding-assistant primer](${SITE_URL}/AGENTS.md)`,
    '',
  ]
  const dir = section.dir.replace(/^src\/app/, '')
  const outFile = path.join(publicDir, dir.replace(/^\//, ''), 'llms.txt')
  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, lines.join('\n'))
  return true
}

const pages = collectPages()
const bySection = new Map()
const pageMeta = []
let written = 0

for (const page of pages) {
  const meta = writeTwin(page)
  if (!meta) continue
  written++
  pageMeta.push({ ...meta, route: page.route })
  if (!page.sectionSlug) continue
  if (!bySection.has(page.sectionSlug)) bySection.set(page.sectionSlug, [])
  bySection.get(page.sectionSlug).push({ ...meta, route: page.route })
}

let indexes = 0
for (const section of SECTIONS) {
  if (!section.slug) continue
  if (writeSectionIndex(section, bySection.get(section.slug) || [])) indexes++
}

// A /docs/llms.txt that points at each section index, so an agent that
// only knows the docs root can still narrow down.
const docsSections = SECTIONS.filter(
  (s) => s.slug && (bySection.get(s.slug) || []).length > 0,
)
if (docsSections.length > 0) {
  fs.writeFileSync(
    path.join(publicDir, 'docs/llms.txt'),
    [
      '# GoFr — Documentation',
      '',
      '> Section indexes for https://gofr.dev/docs. Append `.md` to any page',
      '> URL for its Markdown twin, or send `Accept: text/markdown`.',
      '',
      '## Sections',
      '',
      ...docsSections.map(
        (s) =>
          `- [${s.label}](${SITE_URL}/docs/${s.slug}/llms.txt) — ${
            (bySection.get(s.slug) || []).length
          } pages`,
      ),
      '',
      '## Wider context',
      '',
      `- [Full site index](${SITE_URL}/llms.txt)`,
      `- [Everything in one file](${SITE_URL}/llms-full.txt)`,
      '',
    ].join('\n'),
  )
  indexes++
}

// Machine-readable list of every twin. /openapi.json enumerates its
// `path` parameter from this, so an agent calling getPageMarkdown can
// only ask for paths that exist.
//
// Built from the pages actually WRITTEN, not the pages collected: a
// page.md can be empty (upstream currently ships an empty
// docs/quick-start/cli/page.md), which produces no twin. Enumerating a
// collected-but-skipped route would hand agents a path that 404s —
// exactly the failure the enum exists to prevent.
const routes = pageMeta.map((p) => p.route).sort()
fs.mkdirSync(path.join(repoRoot, 'src/data'), { recursive: true })
fs.writeFileSync(
  path.join(repoRoot, 'src/data/md-twin-routes.json'),
  JSON.stringify(routes, null, 2) + '\n',
)

// NLWeb Schema Feeds: a JSONL feed of schema.org objects, one per
// page, plus the XML Schema Map that robots.txt's `schemamap:`
// directive points at. This is what lets an NLWeb-aware client ingest
// the site's structured data without rendering any HTML.
const feedLines = pageMeta.map((m) =>
  JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${SITE_URL}${m.route}`,
    url: `${SITE_URL}${m.route}`,
    name: m.title,
    headline: m.title,
    description: m.description || undefined,
    inLanguage: 'en',
    isPartOf: { '@type': 'WebSite', name: 'GoFr', url: SITE_URL },
    encoding: {
      '@type': 'MediaObject',
      encodingFormat: 'text/markdown',
      contentUrl: `${SITE_URL}${m.route}.md`,
    },
    publisher: { '@type': 'Organization', name: 'GoFr', url: SITE_URL },
    license: 'https://www.apache.org/licenses/LICENSE-2.0',
  }),
)
fs.mkdirSync(path.join(publicDir, 'feeds'), { recursive: true })
fs.writeFileSync(
  path.join(publicDir, 'feeds/docs.jsonl'),
  feedLines.join('\n') + '\n',
)

fs.writeFileSync(
  path.join(publicDir, 'schemamap.xml'),
  [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<schemamap xmlns="http://www.nlweb.ai/schemas/schemamap/1.0">',
    '  <feed>',
    `    <loc>${SITE_URL}/feeds/docs.jsonl</loc>`,
    '    <format>application/jsonl</format>',
    '    <schema>https://schema.org/TechArticle</schema>',
    `    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>`,
    '  </feed>',
    '  <feed>',
    `    <loc>${SITE_URL}/changelog.xml</loc>`,
    '    <format>application/rss+xml</format>',
    '    <schema>https://schema.org/DataFeed</schema>',
    '  </feed>',
    '</schemamap>',
    '',
  ].join('\n'),
)

console.log(
  `[md-twins] wrote ${written} twin(s), ${indexes} scoped llms.txt file(s), ` +
    `${feedLines.length} schema feed entries`,
)
