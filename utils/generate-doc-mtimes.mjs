#!/usr/bin/env node
// Generate src/data/doc-mtimes.json — a route-to-ISO-date map keyed by
// the doc URL path (e.g. "/docs/advanced-guide/rbac"). Each value is
// the last commit ISO date that touched the underlying source file.
//
// Why git mtime, not fs.statSync(file).mtime: filesystem mtimes get
// bumped by anything that touches the file (a `git checkout` resets
// them, a fresh clone gives every file the clone time). Git's last-
// commit date is the only honest "last actually changed" signal.
//
// Run via npm prebuild. Build sandboxes without git fall back to fs
// mtime so we never emit an empty map.

import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const outFile = path.join(repoRoot, 'src/data/doc-mtimes.json')

function gitMtime(absFile) {
  try {
    const out = execSync(`git log -1 --format=%cI -- "${absFile}"`, {
      cwd: repoRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
    if (out) return out
  } catch {
    // git unavailable or file untracked.
  }
  try {
    return fs.statSync(absFile).mtime.toISOString()
  } catch {
    return null
  }
}

function pageFileToRoute(absFile) {
  const rel = path
    .relative(path.join(repoRoot, 'src/app'), absFile)
    .replace(/\\/g, '/')
  const route = '/' + rel.replace(/\/?page\.(md|jsx|tsx|ts|js)$/, '')
  if (route === '/' || route === '') return '/'
  return route
}

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full, acc)
    } else if (/^page\.(md|jsx|tsx|ts|js)$/.test(entry.name)) {
      acc.push(full)
    }
  }
  return acc
}

const docsDir = path.join(repoRoot, 'src/app/docs')
if (!fs.existsSync(docsDir)) {
  console.warn('[doc-mtimes] no src/app/docs; skipping.')
  process.exit(0)
}

const map = {}
let ok = 0
let fallbacks = 0
for (const file of walk(docsDir)) {
  const route = pageFileToRoute(file)
  const ts = gitMtime(file)
  if (ts) {
    map[route] = ts
    ok++
  } else {
    fallbacks++
  }
}

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, JSON.stringify(map, null, 2) + '\n')
console.log(
  `[doc-mtimes] wrote ${ok} entries (fallbacks=${fallbacks}) to ${path.relative(repoRoot, outFile)}`,
)
