#!/usr/bin/env node
// Check that public/llms.txt links every docs page.
//
// Docs content lives in gofr-dev/gofr (docs/) and is overlaid onto this
// repo at deploy time, so it is not present in a plain checkout. Point
// the script at a checkout of it:
//
//   node utils/check-llms-coverage.mjs --docs ../gofr/docs
//
// Exits 1 and lists the routes that are missing from llms.txt. Empty
// page.md files are ignored.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const SITE_URL = 'https://gofr.dev'

// Directories under gofr/docs that are served under /docs; every other
// directory is served at the site root (see docs/Dockerfile in gofr).
const DOCS_PREFIXED = new Set([
  'quick-start',
  'advanced-guide',
  'datasources',
  'guides',
  'references',
])

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walk(full, acc)
    else if (entry.name === 'page.md' && fs.statSync(full).size > 0)
      acc.push(full)
  }
  return acc
}

function routeFor(docsDir, file) {
  const parts = path
    .relative(docsDir, path.dirname(file))
    .split(path.sep)
    .filter(Boolean)
  if (parts.length === 0) return '/docs'
  return (DOCS_PREFIXED.has(parts[0]) ? '/docs/' : '/') + parts.join('/')
}

const docsFlag = process.argv.indexOf('--docs')
const docsDir =
  docsFlag > -1 ? path.resolve(process.argv[docsFlag + 1] ?? '') : ''
if (!docsDir || !fs.existsSync(docsDir)) {
  console.error(
    'usage: node utils/check-llms-coverage.mjs --docs <path to gofr/docs>',
  )
  process.exit(2)
}

const llms = fs.readFileSync(path.join(repoRoot, 'public/llms.txt'), 'utf8')
const listed = new Set(
  [...llms.matchAll(/\]\(([^)\s]+)\)/g)].map((m) =>
    m[1].replace(SITE_URL, '').replace(/\/$/, ''),
  ),
)

const routes = walk(docsDir)
  .map((f) => routeFor(docsDir, f))
  .sort()
const missing = routes.filter((r) => !listed.has(r))

if (missing.length > 0) {
  console.error(
    `[llms] ${missing.length} of ${routes.length} docs page(s) missing from public/llms.txt:`,
  )
  for (const r of missing) console.error(`  ${SITE_URL}${r}`)
  process.exit(1)
}
console.log(
  `[llms] all ${routes.length} docs page(s) are listed in public/llms.txt`,
)
