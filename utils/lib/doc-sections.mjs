// Single source of truth for "which routes carry Markdoc content".
//
// Consumers:
//   - utils/generate-llms-full.mjs  (concatenated dump)
//   - utils/generate-md-twins.mjs   (per-route .md twins + scoped llms.txt)
//   - utils/generate-openapi.mjs    (section enum)
//
// src/app/sitemap.js deliberately does NOT use this list: it must cover
// .jsx routes too (/team, /roadmap, /showcase), which carry no Markdoc
// content, so it globs instead. It shares only the exclusions below in
// spirit — keep the two exclusion sets in step by hand.
//
// Most of these directories are EMPTY in this repo. Docs live in
// gofr-dev/gofr and are layered in at build time by that repo's
// docs/Dockerfile before `npm run build` runs. So every consumer must
// tolerate a missing directory rather than throwing — a standalone
// build of this repo legitimately has almost none of them.

export const SITE_URL = 'https://gofr.dev'

// Order matters for llms-full.txt: highest-utility content first so
// that when an LLM truncates context, the foundational material
// survives. Twin generation ignores the order.
export const SECTIONS = [
  { dir: 'src/app/docs/quick-start', label: 'Quick Start', slug: 'quick-start' },
  { dir: 'src/app/docs/advanced-guide', label: 'Advanced Guide', slug: 'advanced-guide' },
  { dir: 'src/app/docs/datasources', label: 'Datasources', slug: 'datasources' },
  { dir: 'src/app/docs/guides', label: 'Production guides', slug: 'guides' },
  { dir: 'src/app/docs/references', label: 'References', slug: 'references' },
  { dir: 'src/app/why-gofr', label: 'Why GoFr' },
  { dir: 'src/app/comparison', label: 'Comparison' },
  { dir: 'src/app/migrate', label: 'Migration guides' },
  { dir: 'src/app/learn', label: 'Learn' },
  { dir: 'src/app/faq', label: 'FAQ' },
  // Trust pages. Authored in this repo, not overlaid from the
  // framework — they describe the site, not the framework.
  { dir: 'src/app/privacy', label: 'Privacy' },
  { dir: 'src/app/contact', label: 'Contact' },
]

// Standalone `page.md` files that aren't inside a SECTIONS directory.
// `/docs` is the docs landing page, overlaid from gofr's docs/page.md.
export const STANDALONE_PAGES = ['src/app/docs/page.md']

// Routes that must never get a .md twin. Mirrors the exclusions in
// src/app/sitemap.js — a twin for a route that isn't a crawlable page
// is a URL an agent can waste a request on.
//
//   /api/*         → dead App Router handlers, unreachable under `output: 'export'`
//   /certificate/* → per-user certificate lookups, no content
//   /hackathon     → time-boxed campaign page
//   /pkg/*         → JS-redirect stubs for Go module import paths
//   /cli/*         → metadata-only landing for `go install`
//   /releases      → redirect to /changelog
const EXCLUDED_ROUTE_PATTERNS = [
  /^\/api\//,
  /^\/certificate\//,
  /^\/hackathon\b/,
  /^\/pkg\//,
  /^\/cli\//,
  /^\/releases$/,
  /\[.*\]/,
]

export function isExcludedRoute(route) {
  return EXCLUDED_ROUTE_PATTERNS.some((re) => re.test(route))
}
