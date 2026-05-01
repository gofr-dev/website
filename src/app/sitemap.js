import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import fg from 'fast-glob'

// Dynamic sitemap. With Next.js `output: 'export'`, this runs at build
// time and emits `out/sitemap.xml`. Routes are discovered by globbing
// the app router so new pages appear automatically.
//
// Per the 2025-26 SEO research:
//   - Google actively uses <lastmod> when it's accurate; we derive
//     each route's lastmod from `git log` (or fs mtime as fallback).
//   - <changefreq> and <priority> are explicitly ignored by Google
//     and largely ignored by Bing, so we don't emit them. (Next's
//     sitemap helper expects them as optional fields.)

const SITE_URL = 'https://gofr.dev'

// Files to include even though they're not Next.js routes — published
// at the public root with their own meaning. Without listing them
// here, the sitemap silently omits them.
const STATIC_FILES = ['/llms.txt', '/AGENTS.md', '/robots.txt']

const EXCLUDED_PATTERNS = [
  /\/api\//,
  /\/certificate\//,
  /\/hackathon\b/,
  // /pkg/** are JS-redirect stubs to the real /docs/** pages, kept
  // for the gofr.dev/pkg/... Go-module import path convention. They
  // have no SEO content (PkgRedirect just sets window.location), and
  // listing them as crawl targets dilutes the real docs in SERPs.
  /^\/pkg\//,
  // /cli/gofr is similar — a metadata-only landing for `go install`
  // discoverability, not a navigable page.
  /^\/cli\//,
  // /releases is a redirect to /changelog, no unique content.
  /^\/releases$/,
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

// Last commit date for a file (ISO). Falls back to fs mtime when git
// is unavailable (CI sandboxes, untracked files, etc.). Honest
// "last actually edited" beats "last built" — Google trains on the
// signal and discounts sitemaps that bump every URL on every build.
function lastModForFile(absFile) {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${absFile}"`, {
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (out) return new Date(out)
  } catch {
    // git unavailable or file untracked — fall through.
  }
  try {
    return fs.statSync(absFile).mtime
  } catch {
    return new Date()
  }
}

export default async function sitemap() {
  const repoRoot = path.resolve(process.cwd())
  const files = await fg(
    ['src/app/**/page.md', 'src/app/**/page.jsx', 'src/app/**/page.tsx'],
    { cwd: repoRoot, absolute: true, ignore: ['**/node_modules/**'] },
  )

  const seen = new Set()
  const entries = []

  for (const absFile of files) {
    const route = pageFileToRoute(absFile)
    if (EXCLUDED_PATTERNS.some((re) => re.test(route))) continue
    if (route.includes('[')) continue
    if (seen.has(route)) continue
    seen.add(route)

    entries.push({
      url: SITE_URL + route,
      lastModified: lastModForFile(absFile),
    })
  }

  for (const file of STATIC_FILES) {
    const absFile = path.join(repoRoot, 'public', file.replace(/^\//, ''))
    if (!fs.existsSync(absFile)) continue
    if (seen.has(file)) continue
    seen.add(file)
    entries.push({
      url: SITE_URL + file,
      lastModified: lastModForFile(absFile),
    })
  }

  return entries
}
