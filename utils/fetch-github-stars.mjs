#!/usr/bin/env node
// Build-time GitHub stars fetch.
//
// Why this exists: the header used to call the GitHub API from
// useEffect on every page load — a render-blocking round trip on the
// critical rendering path. Baking the star count in at build time
// means the real number renders on first paint, no API call needed.
//
// Inputs:  none (hits the public GitHub repo metadata endpoint).
// Output:  src/data/github-stars.json — { stars, fetchedAt, source }.
//
// Failure mode: every fetch is best-effort. If the API is down or
// rate-limited at build time, we keep the previous JSON snapshot
// rather than zero-out the badge. This avoids the "transient build
// failure makes the homepage look unloved" problem.
//
// Auth: optional GITHUB_TOKEN raises the rate limit (5,000/hr
// authenticated vs 60/hr unauthenticated).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const outFile = path.join(repoRoot, 'src/data/github-stars.json')

const REPO = 'gofr-dev/gofr'
const TIMEOUT_MS = 10000

function headers() {
  const h = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'gofr.dev build script',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  return h
}

async function fetchRepo() {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: headers(),
      signal: ctrl.signal,
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } finally {
    clearTimeout(t)
  }
}

function readSnapshot() {
  try {
    return JSON.parse(fs.readFileSync(outFile, 'utf8'))
  } catch {
    return null
  }
}

async function main() {
  const snapshot = readSnapshot()
  let data
  try {
    data = await fetchRepo()
  } catch (err) {
    console.warn(
      `[github-stars] live fetch failed (${err.message}); keeping snapshot.`,
    )
    if (snapshot) {
      // Re-write snapshot as-is so timestamps don't get wiped by
      // unrelated tooling. This is a no-op if the file is unchanged.
      fs.writeFileSync(outFile, JSON.stringify(snapshot, null, 2) + '\n')
      return
    }
    // No snapshot to fall back on — write a zeroed record so the
    // import path still resolves at build time.
    fs.mkdirSync(path.dirname(outFile), { recursive: true })
    fs.writeFileSync(
      outFile,
      JSON.stringify({ stars: null, fetchedAt: null, source: 'unavailable' }, null, 2) + '\n',
    )
    return
  }

  // GitHub returns both `stargazers_count` and `watchers_count` (which
  // are the same number, an API quirk). We mirror the existing
  // client-side code, which read `data.watchers`, so the rendered
  // number stays consistent across the site.
  const stars =
    typeof data?.watchers === 'number'
      ? data.watchers
      : typeof data?.stargazers_count === 'number'
      ? data.stargazers_count
      : null

  if (stars === null) {
    console.warn('[github-stars] no usable star count in response; keeping snapshot.')
    if (snapshot) return
  }

  const out = {
    stars: stars ?? snapshot?.stars ?? null,
    fetchedAt: new Date().toISOString(),
    source: 'github-api',
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, JSON.stringify(out, null, 2) + '\n')
  console.log(
    `[github-stars] wrote stars=${out.stars} to ${path.relative(repoRoot, outFile)}.`,
  )
}

main()
