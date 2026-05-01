import fg from 'fast-glob'
import path from 'node:path'

// Dynamic sitemap. With Next.js `output: 'export'`, this runs at build
// time and emits `out/sitemap.xml`. Routes are discovered by globbing
// the app router so new pages appear automatically.

const SITE_URL = 'https://gofr.dev'

const STATIC_ROUTES = [
  { url: '/', priority: 1.0, changeFrequency: 'weekly' },
  { url: '/docs', priority: 0.9, changeFrequency: 'weekly' },
  // AI / LLM discoverability surfaces. Listed in the sitemap so search
  // engines and AI crawlers see them as first-class indexable URLs
  // even though they're plain-text/markdown rather than HTML.
  { url: '/llms.txt', priority: 0.9, changeFrequency: 'weekly' },
  { url: '/AGENTS.md', priority: 0.9, changeFrequency: 'weekly' },
]

const EXCLUDED_PATTERNS = [
  /\/api\//,
  /\/certificate\//,
  /\/hackathon\b/,
]

function pageFileToRoute(absFile) {
  const repoRoot = path.resolve(process.cwd())
  const rel = path
    .relative(path.join(repoRoot, 'src/app'), absFile)
    .replace(/\\/g, '/')
  const route = '/' + rel.replace(/\/?page\.(md|jsx|tsx|ts|js)$/, '')
  if (route === '/' || route === '') return '/'
  return route
}

export default async function sitemap() {
  const files = await fg(
    ['src/app/**/page.md', 'src/app/**/page.jsx', 'src/app/**/page.tsx'],
    { cwd: process.cwd(), absolute: true, ignore: ['**/node_modules/**'] },
  )

  const discovered = files
    .map(pageFileToRoute)
    .filter((r) => !EXCLUDED_PATTERNS.some((re) => re.test(r)))
    .filter((r) => !r.includes('['))

  const seen = new Set()
  const entries = []

  for (const route of [...STATIC_ROUTES.map((s) => s.url), ...discovered]) {
    if (seen.has(route)) continue
    seen.add(route)
    const override = STATIC_ROUTES.find((s) => s.url === route)
    entries.push({
      url: SITE_URL + route,
      lastModified: new Date(),
      changeFrequency: override?.changeFrequency ?? guessChangeFrequency(route),
      priority: override?.priority ?? guessPriority(route),
    })
  }

  return entries
}

function guessPriority(route) {
  if (route === '/') return 1.0
  if (route === '/docs' || route.startsWith('/docs/quick-start')) return 0.9
  if (
    route === '/why-gofr' ||
    route.startsWith('/comparison') ||
    route.startsWith('/migrate') ||
    route === '/learn' ||
    route === '/faq' ||
    route === '/roadmap' ||
    route === '/team'
  )
    return 0.85
  if (route.startsWith('/docs')) return 0.8
  if (route === '/showcase' || route === '/examples' || route === '/community')
    return 0.7
  return 0.6
}

function guessChangeFrequency(route) {
  if (route === '/changelog') return 'weekly'
  if (route.startsWith('/docs')) return 'weekly'
  return 'monthly'
}
