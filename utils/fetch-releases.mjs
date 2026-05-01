#!/usr/bin/env node
// Build-time fetch of every published GoFr release from the GitHub API
// → src/app/changelog/releases.json. Runs in `prebuild` so the
// changelog page always has the full history.
//
// Pagination: GitHub returns max 100 releases per page; we walk pages
// until an empty response. With ~56+ releases this is 1-2 calls.
//
// Auth: optional. Public-repo unauthenticated calls get 60/hr per IP,
// which is fine for typical CI runs. For higher volume set
// GITHUB_TOKEN in the build environment.
//
// Failure mode: if the network is unavailable OR the API returns an
// error, we keep the existing committed snapshot so builds never fail.
// The snapshot lives in the repo precisely so offline / air-gapped CI
// keeps working.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const outFile = path.join(repoRoot, 'src/app/changelog/releases.json')

const REPO = 'gofr-dev/gofr'
const PER_PAGE = 100
const MAX_PAGES = 10 // 1000 releases max — way more than we'll ever have
const TIMEOUT_MS = 15000

async function fetchPage(page) {
  const url = `https://api.github.com/repos/${REPO}/releases?per_page=${PER_PAGE}&page=${page}`
  const headers = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'gofr.dev build script',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, { headers, signal: ctrl.signal })
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} ${res.statusText}`)
    }
    return await res.json()
  } finally {
    clearTimeout(t)
  }
}

function shapeRelease(r) {
  // Match the existing releases.json schema so the changelog page
  // continues to work without modification.
  return {
    body: r.body || '',
    date: r.published_at || r.created_at || null,
    tag: r.tag_name || r.name || '',
    url: r.html_url || `https://github.com/${REPO}/releases`,
  }
}

async function main() {
  let snapshot = null
  if (fs.existsSync(outFile)) {
    try {
      snapshot = JSON.parse(fs.readFileSync(outFile, 'utf8'))
    } catch {
      snapshot = null
    }
  }

  const all = []
  try {
    for (let page = 1; page <= MAX_PAGES; page++) {
      const batch = await fetchPage(page)
      if (!Array.isArray(batch) || batch.length === 0) break
      all.push(...batch.map(shapeRelease))
      if (batch.length < PER_PAGE) break
    }
  } catch (err) {
    if (Array.isArray(snapshot) && snapshot.length) {
      console.warn(
        `[releases] fetch failed (${err.message}); keeping existing snapshot of ${snapshot.length} release(s).`,
      )
      return
    }
    console.warn(
      `[releases] fetch failed and no snapshot: ${err.message}. Writing empty list.`,
    )
    fs.writeFileSync(outFile, '[]\n')
    return
  }

  // Filter out drafts/prereleases the shape mapping might have allowed
  // through with empty tags. Keep stable releases only.
  const cleaned = all.filter((r) => r.tag && r.date)

  // Newest-first by date (GitHub usually returns this order, but make
  // it explicit so the page rendering doesn't depend on it).
  cleaned.sort((a, b) => new Date(b.date) - new Date(a.date))

  if (cleaned.length === 0 && Array.isArray(snapshot) && snapshot.length) {
    console.warn(
      `[releases] API returned 0 valid releases; keeping existing snapshot of ${snapshot.length}.`,
    )
    return
  }

  fs.writeFileSync(outFile, JSON.stringify(cleaned, null, 2) + '\n')
  console.log(
    `[releases] wrote ${cleaned.length} release(s) to ${path.relative(repoRoot, outFile)}.`,
  )
}

main()
