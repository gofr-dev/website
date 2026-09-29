import Markdoc from '@markdoc/markdoc'

// Default import: @markdoc/markdoc ships CommonJS, and Node's ESM loader
// (used by utils/check-changelog.mjs) can't see its named exports.
const { nodes: defaultNodes, Tag, Tokenizer } = Markdoc

// Markdoc's own tokenizer decides where code fences and headings are, so
// the rewriting and section splitting below always agree with the parser
// (a fence inside a list item also ends where the item ends, for example).
//
// Its `{% %}` tag rules are turned off: the text Markdoc finally parses has
// every `{%` in prose escaped and every fence marked process=false, so no
// tag is active in it. Reading the raw text with tags on would let a stray
// `{% include %}` line open a tag and hide the headings after it, while
// the final parse sees them.
const tokenizer = new Tokenizer()
// These are the rule names Markdoc's tag plugin registers (block/core
// "annotations", inline "containers"). They're internal: if a Markdoc
// upgrade renames them, markdown-it throws here and the build fails
// loudly rather than silently tokenizing with tags on.
tokenizer.parser.disable(['annotations', 'containers'])

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
// whitespace or an opening parenthesis. Trailing punctuation is not part of
// the link.
const BARE_URL =
  /(^|\s|(?<!\])\()(https?:\/\/[^\s<>()[\]]*[^\s<>()[\].,;:!?'"])/g

// Existing links ([text](url), <https://…>) whose text or target must not
// be auto-linked a second time.
const MARKDOWN_LINK = /!?\[[^\]]*\]\([^)]*\)|<https?:\/\/[^>\s]*>/g

function linkBareUrls(text) {
  let out = ''
  let last = 0
  const link = (part) =>
    part.replace(BARE_URL, (_, lead, url) => `${lead}[${url}](${url})`)
  for (const m of text.matchAll(MARKDOWN_LINK)) {
    out += link(text.slice(last, m.index)) + m[0]
    last = m.index + m[0].length
  }
  return out + link(text.slice(last))
}

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
    linkBareUrls(text.replace(IMG_TAG, imgToMarkdown))
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

// Line ranges of every code fence, as Markdoc's tokenizer sees them:
// [first line, line after the last]. A fence left open inside a list item
// ends with the item, not at the end of the document.
function fenceRanges(tokens) {
  return tokens
    .filter((t) => t.type === 'fence' && t.map)
    .map((t) => ({ start: t.map[0], end: t.map[1] }))
}

// Applies fn to prose only: fenced code blocks and inline code spans are
// passed through untouched, so code samples are never rewritten.
function mapOutsideCode(text, fn) {
  const lines = text.split('\n')
  const fences = fenceRanges(tokenizer.tokenize(text))
  const out = []
  let prose = []
  let line = 0

  const flush = () => {
    if (prose.length === 0) return
    out.push(mapOutsideInlineCode(prose.join('\n'), fn))
    prose = []
  }

  for (const fence of fences) {
    prose.push(...lines.slice(line, fence.start))
    flush()
    out.push(openFence(lines[fence.start]))
    out.push(...lines.slice(fence.start + 1, fence.end))
    line = fence.end
  }
  prose.push(...lines.slice(line))
  flush()

  return out.join('\n')
}

export function normalizeReleaseMarkdown(text) {
  if (!text) return ''
  return mapOutsideCode(text.replace(/\r\n?/g, '\n'), transformProse)
}

// A heading that only repeats the version ("# Release v1.46.0",
// "## **Release - v1.38.0**", "## v1.43.0") is a title, not a section.
export function isTitleHeading(header) {
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

// Whether a top-level heading starts a section: every `#` and `##`, and a
// `###` only when it is a section name. Exported for check-changelog.mjs,
// which uses it to spot a section heading left inside another section.
export function isSectionHeading(depth, label) {
  return depth < 3 || (depth === 3 && SECTION_NAME.test(label))
}

// The heading as plain text for the card title and badge: decoration and
// inline markdown ([text](url), `code`, **bold**, a trailing colon) removed.
export function headingText(raw) {
  return raw
    .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, '')
    .replace(EMOJI_SHORTCODE, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[*`]/g, '')
    .replace(/\s*:\s*$/, '')
    .trim()
}

// Top-level `#`-style headings with the line they are on, from Markdoc's
// tokenizer, so headings inside code, list items or quotes never count.
// Setext headings (text underlined with ---) stay part of the content.
function topLevelHeadings(tokens) {
  const headings = []
  tokens.forEach((t, i) => {
    if (t.type !== 'heading_open' || t.level !== 0 || !t.map) return
    if (!t.markup.startsWith('#')) return
    headings.push({
      line: t.map[0],
      depth: Number(t.tag.slice(1)),
      raw: (tokens[i + 1]?.content ?? '').trim(),
    })
  })
  return headings
}

// Splits a release body into its sections (Features, Enhancements, Fixes,
// …), which releases mark with `#`, `##` or `###` headings. Text before the
// first section is kept as an "overview" section instead of being dropped.
export function splitReleaseSections(body) {
  if (!body) return []

  const text = body.replace(/\r\n?/g, '\n')
  const lines = text.split('\n')
  const sections = []
  let current = { type: 'overview', label: 'Overview', lines: [] }
  let line = 0

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

  for (const heading of topLevelHeadings(tokenizer.tokenize(text))) {
    const label = headingText(heading.raw)
    const isTitle = isTitleHeading(label)
    // Any other heading (a `###` feature title, `####`) stays in the section.
    if (!isTitle && !isSectionHeading(heading.depth, label)) continue

    current.lines.push(...lines.slice(line, heading.line))
    line = heading.line + 1

    // The release title (# Release v1.x.x) is already shown on the card.
    if (isTitle) continue

    push()
    const type = sectionType(label)
    current = {
      type,
      label,
      lines: [],
      // Only a sentence-like heading is kept as a notice when it has no
      // body; empty "What's Changed" style headings are dropped.
      notice:
        KNOWN_TYPES.has(type) || label.split(/\s+/).length < 4
          ? ''
          : heading.raw,
    }
  }
  current.lines.push(...lines.slice(line))
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
