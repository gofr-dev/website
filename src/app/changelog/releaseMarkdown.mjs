import Markdoc from '@markdoc/markdoc'

// Default import: @markdoc/markdoc ships CommonJS, and Node's ESM loader
// (used by the changelog checks) can't see its named exports.
const { nodes: defaultNodes, Tag } = Markdoc

// GitHub release bodies are GitHub-flavoured markdown. They used to be
// rendered by a small line-by-line parser that only knew about fences,
// `###` headings, `-` bullets, bold and inline code, so tables, links,
// nested/numbered lists, `####` headings, blockquotes and images all
// showed up as raw markdown. They now go through Markdoc — the same
// renderer the docs use — with the site's own Fence/AutoLink components.

// Decorative emoji the release template puts in front of headings and
// highlights (🔹 **Title**). The section cards already carry colour and a
// label, so these are dropped, as the previous renderer did.
const DECORATIVE_EMOJI = /[🔹🚀🔧🛠💎⚡]\uFE0F?\s*/gu

// GitHub colon shortcodes (:rocket:, :small_blue_diamond:). Only whole
// words are removed (after whitespace, before whitespace or punctuation),
// so `host:port` or times are never touched.
const EMOJI_SHORTCODE = /(^|\s):[a-z][a-z0-9_+-]*:(?=[\s,.!?;)\]]|$)/g

// A bare URL that GitHub would auto-link. It must start the line or follow
// whitespace or an opening parenthesis, so URLs that are already the target
// or text of a markdown link (`](https://…)`, `[https://…]`) are left
// alone. Trailing punctuation is not part of the link.
const BARE_URL =
  /(^|\s|(?<!\])\()(https?:\/\/[^\s<>()[\]]*[^\s<>()[\].,;:!?'"])/g

// Raw <img> tags, which GitHub renders for pasted screenshots.
const IMG_TAG = /<img\b[^>]*>/gi

function attr(tag, name) {
  const m = new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i').exec(
    tag,
  )
  return m ? m[2] ?? m[3] ?? '' : ''
}

function imgToMarkdown(tag) {
  const src = attr(tag, 'src')
  // Only plain https images are kept; anything else stays escaped text.
  if (!/^https:\/\//i.test(src)) return tag
  const alt = attr(tag, 'alt').replace(/[[\]]/g, '')
  return `![${alt}](${src})`
}

function transformProse(text) {
  return (
    text
      .replace(IMG_TAG, imgToMarkdown)
      .replace(BARE_URL, (_, lead, url) => `${lead}[${url}](${url})`)
      // Before punctuation the space in front goes too ("launch :rocket:,").
      .replace(EMOJI_SHORTCODE, (m, lead, offset, str) =>
        /[,.!?;)\]]/.test(str[offset + m.length] ?? '') ? '' : lead,
      )
      .replace(DECORATIVE_EMOJI, '')
      // `{%` opens a Markdoc tag; release notes never mean that.
      .replace(/\{%/g, '\\{%')
  )
}

// An inline code span opens and closes with backtick runs of the same
// length (``a ` b`` is one span), so a single backtick inside a
// double-backtick span doesn't end it.
const CODE_SPAN = /(?<!`)(`+)(?!`)[\s\S]*?(?<!`)\1(?!`)/g

function mapOutsideInlineCode(text, fn) {
  let out = ''
  let last = 0
  for (const m of text.matchAll(CODE_SPAN)) {
    out += fn(text.slice(last, m.index)) + m[0]
    last = m.index + m[0].length
  }
  return out + fn(text.slice(last))
}

// Markdoc looks for `{% %}` tags inside code fences too, and a stray one
// (a Jinja/Helm/CI snippet) makes it lose the fence's end, swallowing the
// rest of the release and failing the build. `process=false` makes it
// treat the fence body as plain text.
function openFence(line) {
  return line.includes('{%') ? line : `${line} {% process=false %}`
}

// Applies fn to prose only: fenced code blocks and inline code spans are
// passed through untouched, so code samples are never rewritten.
function mapOutsideCode(text, fn) {
  const out = []
  let fence = null
  let prose = []

  const flush = () => {
    if (prose.length === 0) return
    out.push(mapOutsideInlineCode(prose.join('\n'), fn))
    prose = []
  }

  for (const line of text.split('\n')) {
    const marker = /^\s*(`{3,}|~{3,})/.exec(line)
    if (fence) {
      out.push(line)
      if (
        marker &&
        marker[1][0] === fence[0] &&
        marker[1].length >= fence.length
      )
        fence = null
      continue
    }
    if (marker) {
      flush()
      fence = marker[1]
      out.push(openFence(line))
      continue
    }
    prose.push(line)
  }
  flush()

  return out.join('\n')
}

export function normalizeReleaseMarkdown(text) {
  if (!text) return ''
  return mapOutsideCode(text.replace(/\r\n?/g, '\n'), transformProse)
}

// A heading that only repeats the version ("# Release v1.46.0",
// "## **Release - v1.38.0**", "## v1.43.0") is a title, not a section.
function isTitleHeading(header) {
  return /^(release\s*[-–:]?\s*)?v?\d+(\.\d+){1,2}\.?[\w.+-]*$/i.test(header)
}

// Section names a release uses for its own grouping. Some releases put
// these at `###` rather than `##`, so a `###` heading only starts a section
// when it is exactly one of these ("Bug Fixes & Small Changes" too); any
// other `###` ("Fix Google Pubsub Panic") is a heading inside a section.
const SECTION_NAME =
  /^(new\s+)?(features?|enhancements?|improvements?|(bug\s*)?fix(es)?|security(\s+fix(es)?)?|performance|breaking\s+changes?|dependency\s+updates?|deprecations?)(\s*(&|and|\/)\s*[\w\s&/-]+)?$/i

function sectionType(header) {
  if (/\bfeatures?\b/i.test(header)) return 'features'
  if (/\b(enhancements?|improvements?)\b/i.test(header)) return 'enhancements'
  if (/\bfix(es|ed)?\b/i.test(header)) return 'fixes'
  return header.toLowerCase()
}

const KNOWN_TYPES = new Set(['features', 'enhancements', 'fixes'])

// The heading as plain text for the card title and badge: decoration and
// inline markdown ([text](url), `code`, **bold**, a trailing colon) removed.
function headingText(raw) {
  return raw
    .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, '')
    .replace(EMOJI_SHORTCODE, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*`]/g, '')
    .replace(/\s*:\s*$/, '')
    .trim()
}

// Splits a release body into its sections (Features, Enhancements, Fixes,
// …), which releases mark with `#`, `##` or `###` headings. Text before the
// first section is kept as an "overview" section instead of being dropped,
// and headings inside code blocks are ignored.
export function splitReleaseSections(body) {
  if (!body) return []

  const sections = []
  let current = { type: 'overview', label: 'Overview', lines: [] }
  let fence = null

  const push = () => {
    const content = current.lines.join('\n').trim()
    // A section that is only divider lines (`---`, `***`) has nothing to
    // show, e.g. the rule some releases put under their title.
    if (content.replace(/^\s*([-*_])(\s*\1){2,}\s*$/gm, '').trim()) {
      sections.push({ type: current.type, label: current.label, content })
    } else if (current.notice) {
      // A heading with no body is a notice ("This version contains
      // breaking changes, please use v1.14.1"); show the heading itself.
      sections.push({ type: 'note', label: 'Note', content: current.notice })
    }
  }

  for (const line of body.replace(/\r\n?/g, '\n').split('\n')) {
    const marker = /^\s*(`{3,}|~{3,})/.exec(line)
    if (fence) {
      current.lines.push(line)
      if (
        marker &&
        marker[1][0] === fence[0] &&
        marker[1].length >= fence.length
      )
        fence = null
      continue
    }
    if (marker) {
      fence = marker[1]
      current.lines.push(line)
      continue
    }

    const heading = /^(#{1,3})\s+(.*)$/.exec(line.trim())
    if (heading) {
      const raw = heading[2].trim()
      const text = headingText(raw)

      // The release title (# Release v1.x.x) is already shown on the card.
      if (isTitleHeading(text)) continue

      if (heading[1].length < 3 || SECTION_NAME.test(text)) {
        push()
        const type = sectionType(text)
        current = {
          type,
          label: text,
          lines: [],
          // Only a sentence-like heading is kept as a notice when it has
          // no body; empty "What's Changed" style headings are dropped.
          notice:
            KNOWN_TYPES.has(type) || text.split(/\s+/).length < 4 ? '' : raw,
        }
        continue
      }
    }

    current.lines.push(line)
  }
  push()

  return sections
}

export const releaseMarkdocConfig = {
  nodes: {
    // Section cards already have a title, so body headings are demoted
    // one level. They get no id: the same heading text appears in many
    // releases on one page, and duplicate ids would break anchors.
    heading: {
      ...defaultNodes.heading,
      transform(node, cfg) {
        const level = Math.min(6, node.attributes.level + 1)
        return new Tag(`h${level}`, {}, node.transformChildren(cfg))
      },
    },
    // Wide tables scroll inside the card instead of widening it.
    table: {
      ...defaultNodes.table,
      transform(node, cfg) {
        return new Tag('div', { class: 'overflow-x-auto' }, [
          new Tag(
            'table',
            node.transformAttributes(cfg),
            node.transformChildren(cfg),
          ),
        ])
      },
    },
    fence: {
      render: 'Fence',
      attributes: {
        language: { type: String },
        // Set by openFence; never rendered.
        process: { type: Boolean, render: false },
        // The code itself; declared so validation passes, and passed to
        // Fence as children rather than as a prop.
        content: { type: String, render: false },
      },
      // With process=false Markdoc keeps the code only in `content` and
      // gives the fence no children, so pass it through explicitly.
      transform(node, cfg) {
        return new Tag('Fence', node.transformAttributes(cfg), [
          node.attributes.content,
        ])
      },
    },
    link: {
      ...defaultNodes.link,
      render: 'AutoLink',
    },
    image: {
      ...defaultNodes.image,
      transform(node, cfg) {
        return new Tag('img', {
          ...node.transformAttributes(cfg),
          loading: 'lazy',
        })
      },
    },
  },
}
