#!/usr/bin/env node
// Build-time enrichment for the team page.
//
// Inputs:
//   - src/data/team.json  — manually maintained list of core team
//     entries (role, optional github handle, optional linkedin URL).
//
// What this script does:
//   1. For every team member with a `github` handle, fetches their
//      public GitHub profile (name, bio, avatar, blog, company,
//      location, followers, public repos).
//   2. Paginates through every contributor of gofr-dev/gofr so the
//      page can render an "All contributors" grid below the core team.
//   3. Writes the merged data to src/data/team-enriched.json.
//
// What it does NOT do:
//   - Scrape LinkedIn. LinkedIn URLs in team.json come straight from
//     maintainers themselves and are surfaced as click-through links.
//
// Failure mode: every fetch is per-entry resilient — if a specific
// profile or the contributors endpoint fails (rate-limit, network),
// we fall back to that entry's previous snapshot data instead of
// losing it. This avoids the "one half-rate-limited run blows away
// the cached avatars" failure mode.
//
// Auth: optional GITHUB_TOKEN raises the rate limit dramatically
// (5,000/hr authenticated vs 60/hr unauthenticated).

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const inFile = path.join(repoRoot, 'src/data/team.json')
const outFile = path.join(repoRoot, 'src/data/team-enriched.json')

const REPO = 'gofr-dev/gofr'
const TIMEOUT_MS = 15000

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
    if (!res.ok) throw new Error(`HTTP ${res.status} on ${url}`)
    return await res.json()
  } finally {
    clearTimeout(t)
  }
}

async function fetchGithubProfile(login) {
  try {
    const u = await fetchJson(`https://api.github.com/users/${encodeURIComponent(login)}`)
    return {
      login: u.login,
      avatar_url: u.avatar_url,
      profile_url: u.html_url,
      profile_name: u.name || null,
      bio: u.bio || null,
      blog: u.blog || null,
      company: u.company || null,
      location: u.location || null,
      followers: u.followers || 0,
      public_repos: u.public_repos || 0,
    }
  } catch (err) {
    return { __error: err.message }
  }
}

// Composite-score signals beyond commit count. Each query returns a
// `total_count` we read directly without paginating — we just need
// the number, never the items. The Search API has a tighter rate
// limit (30/min authenticated) than the core REST API, so we throttle
// across users via Promise.all per-user but serialize across users.
//
// `is:pr+is:merged+author:U+repo:R`   → PRs the user merged into the repo
// `is:pr+reviewed-by:U+repo:R`        → PRs the user formally reviewed
// `commenter:U+repo:R`                → unique threads (issues+PRs) the
//                                       user has commented on
//
// The "reviewed-by:" qualifier counts only formal reviews submitted
// via the PR review UI (Approve / Request changes / Comment-via-review).
// Plain conversation comments fall under "commenter:" instead.
async function fetchSearchTotal(query) {
  const url = `https://api.github.com/search/issues?q=${encodeURIComponent(query)}&per_page=1`
  try {
    const data = await fetchJson(url)
    return typeof data?.total_count === 'number' ? data.total_count : null
  } catch {
    return null
  }
}

async function scoreContributor(login) {
  const [prsMerged, reviewsAuthored, commentsAuthored] = await Promise.all([
    fetchSearchTotal(`is:pr is:merged author:${login} repo:${REPO}`),
    fetchSearchTotal(`is:pr reviewed-by:${login} repo:${REPO}`),
    fetchSearchTotal(`commenter:${login} repo:${REPO}`),
  ])
  return { prsMerged, reviewsAuthored, commentsAuthored }
}

// Composite weights — chosen so a *gated, finished contribution*
// (merged PR) outranks a single commit, formal reviews count next,
// and bare conversation comments contribute a soft tail. Tuneable.
//
// score = 1·commits + 5·prs_merged + 2·reviews + 0.5·comments
function compositeScore({ commits = 0, prsMerged = 0, reviewsAuthored = 0, commentsAuthored = 0 }) {
  return (
    1 * (commits || 0) +
    5 * (prsMerged || 0) +
    2 * (reviewsAuthored || 0) +
    0.5 * (commentsAuthored || 0)
  )
}

// We score the top N candidates by raw commit count rather than every
// contributor — the GitHub Search API limit is 30 req/min authenticated
// and each user costs 3 search calls. 15 candidates with a 7-sec delay
// between users keeps us safely under the limit (about 26 req/min) and
// finishes in ~100 sec wall time. The top 15 by commits comfortably
// contains anyone realistically in the running for "top 5 by composite",
// so this is a tight no-waste budget.
const SCORE_TOP_N = 15
const SCORE_DELAY_MS = 7000

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

async function fetchAllContributors() {
  // Paginate until empty so the count is exact, not capped at 100.
  const all = []
  for (let page = 1; page <= 20; page++) {
    try {
      const batch = await fetchJson(
        `https://api.github.com/repos/${REPO}/contributors?per_page=100&page=${page}`,
      )
      if (!Array.isArray(batch) || batch.length === 0) break
      all.push(...batch)
      if (batch.length < 100) break
    } catch (err) {
      console.warn(
        `[team] contributors page ${page} failed (${err.message}); have ${all.length} so far.`,
      )
      // Return what we have plus an error marker so the caller can
      // fall back to snapshot if appropriate.
      return { items: all, partial: true, error: err.message }
    }
  }
  return { items: all, partial: false }
}

// In CI, gofr-dev/gofr's docs/Dockerfile overlays team.json from the
// framework into this repo before yarn refresh-data runs. Locally
// (where the website is checked out without the framework alongside),
// team.json is no longer committed here. Fall back to the sibling
// gofr-dev/gofr clone if it's available — same source of truth.
const FRAMEWORK_FALLBACK = path.resolve(repoRoot, '../gofr/docs/team.json')

function locateTeamFile() {
  if (fs.existsSync(inFile)) return inFile
  if (fs.existsSync(FRAMEWORK_FALLBACK)) {
    console.warn(
      `[team] using framework fallback ${path.relative(repoRoot, FRAMEWORK_FALLBACK)}`,
    )
    return FRAMEWORK_FALLBACK
  }
  return null
}

async function main() {
  const teamFile = locateTeamFile()
  if (!teamFile) {
    console.warn(`[team] no team.json at ${inFile} or framework fallback; skipping enrichment.`)
    process.exit(0)
  }

  let snapshot = null
  if (fs.existsSync(outFile)) {
    try {
      snapshot = JSON.parse(fs.readFileSync(outFile, 'utf8'))
    } catch {
      snapshot = null
    }
  }

  // Snapshot lookup helpers — used to fall back per-member when the
  // current fetch fails for that individual.
  const snapshotByGithub = new Map()
  for (const m of snapshot?.team || []) {
    if (m.github && m.github_data) snapshotByGithub.set(m.github, m.github_data)
  }

  const team = JSON.parse(fs.readFileSync(teamFile, 'utf8'))

  // Enrich each team member with GitHub profile data when handle is provided.
  // If the live fetch fails, fall back to the snapshot's data for that member.
  const coreTeam = []
  let profileFailures = 0
  for (const member of team) {
    const enriched = { ...member }
    if (member.github) {
      const profile = await fetchGithubProfile(member.github)
      if (profile?.__error) {
        profileFailures++
        const fallback = snapshotByGithub.get(member.github)
        if (fallback) {
          enriched.github_data = fallback
          console.warn(
            `[team] live fetch failed for "${member.github}" (${profile.__error}); using snapshot data.`,
          )
        } else {
          console.warn(
            `[team] live fetch failed for "${member.github}" (${profile.__error}); no snapshot fallback.`,
          )
        }
      } else if (profile) {
        enriched.github_data = profile
        if (!enriched.name && profile.profile_name) enriched.name = profile.profile_name
      }
    }
    coreTeam.push(enriched)
  }

  // Fetch all contributors (paginated). Fall back to snapshot if the
  // request failed mid-flight or returned nothing.
  const contributorsResult = await fetchAllContributors()
  const coreLogins = new Set(coreTeam.map((m) => m.github).filter(Boolean))

  // Cross-reference: stash each core member's commit count to
  // gofr-dev/gofr under github_data.gofr_contributions so the team
  // card can render "N commits" as a meaningful proof point. The
  // GitHub contributor login is case-insensitive against the team.json
  // handle (e.g. "Umang01-hash" vs "umang01-hash") so we lowercase
  // before lookup.
  const contributionsByLogin = new Map()
  for (const c of contributorsResult.items || []) {
    if (c?.login) contributionsByLogin.set(c.login.toLowerCase(), c.contributions)
  }
  for (const m of coreTeam) {
    if (!m.github || !m.github_data) continue
    const count = contributionsByLogin.get(m.github.toLowerCase())
    if (typeof count === 'number') m.github_data.gofr_contributions = count
  }

  let contributors = (contributorsResult.items || [])
    .filter((c) => c.type === 'User' && !c.login.includes('[bot]'))
    .filter((c) => !coreLogins.has(c.login)) // de-dupe core team from grid
    .map((c) => ({
      login: c.login,
      avatar_url: c.avatar_url,
      profile_url: c.html_url,
      contributions: c.contributions,
    }))

  // Score the top SCORE_TOP_N candidates with the composite signal.
  // Snapshot fallback: if a search call fails for a user, the previous
  // value from the snapshot (if any) is preserved so a transient rate-
  // limit doesn't drop their reviews/PRs counts to zero.
  const snapshotByLogin = new Map(
    (snapshot?.contributors || []).map((c) => [c.login, c]),
  )
  const candidates = contributors.slice(0, SCORE_TOP_N)
  let scoredCount = 0

  for (let i = 0; i < candidates.length; i++) {
    const c = candidates[i]
    const fresh = await scoreContributor(c.login)
    const fallback = snapshotByLogin.get(c.login) || {}
    c.prs_merged = fresh.prsMerged ?? fallback.prs_merged ?? 0
    c.reviews_authored = fresh.reviewsAuthored ?? fallback.reviews_authored ?? 0
    c.comments_authored = fresh.commentsAuthored ?? fallback.comments_authored ?? 0
    c.score = compositeScore({
      commits: c.contributions,
      prsMerged: c.prs_merged,
      reviewsAuthored: c.reviews_authored,
      commentsAuthored: c.comments_authored,
    })
    if (
      fresh.prsMerged !== null ||
      fresh.reviewsAuthored !== null ||
      fresh.commentsAuthored !== null
    ) {
      scoredCount++
    }
    // Throttle between users to stay under the Search API's 30/min
    // limit. Skip the wait after the last candidate.
    if (i < candidates.length - 1) await sleep(SCORE_DELAY_MS)
  }

  // Un-scored contributors get a baseline score from commit count alone
  // so the array remains comparable. They sort below any scored
  // contributor with comparable commits because reviews/comments
  // signals add to the scored ones.
  for (const c of contributors.slice(SCORE_TOP_N)) {
    c.score = compositeScore({ commits: c.contributions })
  }

  // Re-rank by composite score (descending). Stable sort: ties fall
  // back to commit count since both sides have it.
  contributors.sort((a, b) => (b.score || 0) - (a.score || 0))

  // Total contributors INCLUDING the core team — so the page can show
  // a true "X+ contributors" stat without having to add anything.
  let totalContributors = (contributorsResult.items || []).filter(
    (c) => c.type === 'User' && !c.login.includes('[bot]'),
  ).length

  // If the live contributor fetch failed AND we have a snapshot with
  // useful contributor data, prefer the snapshot rather than blank.
  if (
    (contributorsResult.partial || contributors.length === 0) &&
    Array.isArray(snapshot?.contributors) &&
    snapshot.contributors.length > contributors.length
  ) {
    console.warn(
      `[team] contributor fetch incomplete (got ${contributors.length}); using snapshot of ${snapshot.contributors.length}.`,
    )
    contributors = snapshot.contributors
    totalContributors = snapshot.totalContributors || contributors.length + coreTeam.length
  }

  const data = {
    repo: REPO,
    fetchedAt: new Date().toISOString(),
    team: coreTeam,
    contributors,
    totalContributors,
  }

  fs.mkdirSync(path.dirname(outFile), { recursive: true })
  fs.writeFileSync(outFile, JSON.stringify(data, null, 2) + '\n')
  console.log(
    `[team] wrote ${coreTeam.length} core member(s), ${contributors.length} contributor(s) (total ${totalContributors}) to ${path.relative(repoRoot, outFile)}.${
      profileFailures ? ` ${profileFailures} profile fetch(es) used snapshot fallback.` : ''
    }${
      typeof scoredCount !== 'undefined'
        ? ` Composite scored ${scoredCount}/${SCORE_TOP_N} top candidates.`
        : ''
    }`,
  )
}

main()
