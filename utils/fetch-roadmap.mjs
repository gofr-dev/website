#!/usr/bin/env node
// Build-time fetch of the roadmap from GitHub →
// src/data/roadmap.json. Two sources are merged:
//
//   1. Open milestones on `gofr-dev/gofr` (with their open issues).
//      Milestones are the strongest signal: a maintainer chose to
//      group these issues toward a target version / theme.
//
//   2. Open issues labeled `roadmap` (or any label listed in
//      ROADMAP_LABELS env var, default `roadmap`). Milestone-less
//      ideas the maintainers want to surface.
//
// Closed issues are excluded — those are shipped, and the changelog
// is the canonical place for shipped work.
//
// Failure mode: if the network is unavailable OR the API errors, we
// keep the existing committed snapshot so builds never fail.
//
// Auth: optional GITHUB_TOKEN env var raises the rate limit. Public-
// repo unauthenticated calls get 60/hr per IP, plenty for typical CI.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const outFile = path.join(repoRoot, 'src/data/roadmap.json')

const REPO = 'gofr-dev/gofr'
const PER_PAGE = 100
const MAX_PAGES = 5
const TIMEOUT_MS = 15000
// Default labels: `enhancement` is the standard GitHub label every
// repo gets; the framework currently uses it for future-work tracking.
// `roadmap` is honored when/if the maintainers introduce that label
// for explicit roadmap tagging. Override via ROADMAP_LABELS env var.
const ROADMAP_LABELS = (process.env.ROADMAP_LABELS || 'roadmap,enhancement')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)

function headers() {
  const h = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'gofr.dev build script',
    'X-GitHub-Api-Version': '2022-11-28',
  }
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  return h
}

async function fetchJson(url) {
  const ctrl = new AbortController()
  const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, { headers: headers(), signal: ctrl.signal })
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText} on ${url}`)
    return await res.json()
  } finally {
    clearTimeout(t)
  }
}

async function fetchPaged(baseUrl) {
  const out = []
  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = baseUrl + (baseUrl.includes('?') ? '&' : '?') + `per_page=${PER_PAGE}&page=${page}`
    const batch = await fetchJson(url)
    if (!Array.isArray(batch) || batch.length === 0) break
    out.push(...batch)
    if (batch.length < PER_PAGE) break
  }
  return out
}

function shapeIssue(i) {
  return {
    number: i.number,
    title: i.title,
    url: i.html_url,
    state: i.state,
    labels: (i.labels || []).map((l) => (typeof l === 'string' ? l : l.name)),
    milestone: i.milestone?.title || null,
    created_at: i.created_at,
    updated_at: i.updated_at,
    comments: i.comments,
  }
}

function shapeMilestone(m) {
  return {
    title: m.title,
    description: m.description || '',
    due_on: m.due_on,
    state: m.state,
    open_issues: m.open_issues,
    closed_issues: m.closed_issues,
    progress:
      m.open_issues + m.closed_issues > 0
        ? Math.round((m.closed_issues / (m.open_issues + m.closed_issues)) * 100)
        : 0,
    url: m.html_url,
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

  try {
    // 1. Open milestones, sorted by due date.
    const milestones = (
      await fetchJson(
        `https://api.github.com/repos/${REPO}/milestones?state=open&sort=due_on&direction=asc&per_page=${PER_PAGE}`,
      )
    ).map(shapeMilestone)

    // 2. All open issues with ANY of the configured labels. GitHub's
    //    `labels=a,b` parameter is AND logic, so we issue one call per
    //    label and union the results. Labels that don't exist on the
    //    repo simply yield zero results.
    const labeled = []
    for (const label of ROADMAP_LABELS) {
      try {
        const batch = await fetchPaged(
          `https://api.github.com/repos/${REPO}/issues?state=open&labels=${encodeURIComponent(label)}`,
        )
        labeled.push(...batch)
      } catch (err) {
        // Label-specific failure shouldn't doom the whole roadmap;
        // log and continue.
        console.warn(`[roadmap] label "${label}" lookup failed: ${err.message}`)
      }
    }

    // 3. Open issues that have a milestone assigned (any milestone we
    //    saw in step 1). One call per milestone — usually 1-3 calls.
    const milestonedIssues = []
    for (const m of milestones) {
      const issues = await fetchPaged(
        `https://api.github.com/repos/${REPO}/issues?state=open&milestone=${encodeURIComponent(m.title)}`,
      )
      milestonedIssues.push(...issues)
    }

    // Merge & dedupe (an issue can match both labelled and milestoned).
    const byNumber = new Map()
    for (const i of [...labeled, ...milestonedIssues]) {
      // GitHub's issues endpoint returns PRs too; filter them out.
      if (i.pull_request) continue
      byNumber.set(i.number, shapeIssue(i))
    }
    const items = [...byNumber.values()].sort((a, b) =>
      (a.milestone || 'zzz').localeCompare(b.milestone || 'zzz') ||
      a.number - b.number,
    )

    const data = {
      repo: REPO,
      fetchedAt: new Date().toISOString(),
      labels: ROADMAP_LABELS,
      milestones,
      items,
    }

    if (
      items.length === 0 &&
      milestones.length === 0 &&
      Array.isArray(snapshot?.items) &&
      snapshot.items.length
    ) {
      console.warn(
        `[roadmap] API returned 0 items and 0 milestones; keeping existing snapshot.`,
      )
      return
    }

    fs.mkdirSync(path.dirname(outFile), { recursive: true })
    fs.writeFileSync(outFile, JSON.stringify(data, null, 2) + '\n')
    console.log(
      `[roadmap] wrote ${milestones.length} milestone(s), ${items.length} item(s) to ${path.relative(repoRoot, outFile)}.`,
    )
  } catch (err) {
    if (snapshot) {
      console.warn(
        `[roadmap] fetch failed (${err.message}); keeping existing snapshot.`,
      )
      return
    }
    fs.mkdirSync(path.dirname(outFile), { recursive: true })
    fs.writeFileSync(
      outFile,
      JSON.stringify(
        {
          repo: REPO,
          fetchedAt: new Date().toISOString(),
          labels: ROADMAP_LABELS,
          milestones: [],
          items: [],
          error: err.message,
        },
        null,
        2,
      ) + '\n',
    )
    console.warn(
      `[roadmap] fetch failed and no snapshot. Wrote empty placeholder. Error: ${err.message}`,
    )
  }
}

main()
