'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import releases from './releases.json'

// Pagination — client-side only since the page is `'use client'` and
// we want every release to remain in the DOM so deep-link anchors
// (e.g. /changelog#v1.30.0) keep working even when the target sits
// past the initial slice. The button advances the window in PAGE_SIZE
// chunks; on hash change we auto-extend to include the target.
const PAGE_SIZE = 20

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

// Returns a month key like "2026-04" used both for grouping and for
// generating the anchor ID we link to from the right-rail.
function monthKey(dateStr) {
  if (!dateStr) return 'unknown'
  const d = new Date(dateStr)
  return `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}`
}

function formatMonthLabel(key) {
  if (!key || key === 'unknown') return 'Unknown'
  const [y, m] = key.split('-')
  const d = new Date(Number(y), Number(m) - 1, 1)
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

// Group releases by month, preserving the chronological order of the
// source array (newest first).
function groupByMonth(items) {
  const groups = []
  const seen = new Map()
  for (const item of items) {
    const key = monthKey(item.date)
    if (!seen.has(key)) {
      const g = { key, label: formatMonthLabel(key), releases: [] }
      seen.set(key, g)
      groups.push(g)
    }
    seen.get(key).releases.push(item)
  }
  return groups
}

// Returns a minor-version key like "v1.56" — drops the patch number.
// Releases without a parseable v<major>.<minor>.<patch> tag fall into
// "other" so the rail still has somewhere to put them.
function versionKey(tag) {
  if (!tag) return 'other'
  const m = /^v?(\d+)\.(\d+)\.\d+/.exec(tag)
  return m ? `v${m[1]}.${m[2]}` : 'other'
}

// Group releases by minor version line. Same shape as groupByMonth so
// MonthRail can render either set without knowing the difference.
function groupByVersion(items) {
  const groups = []
  const seen = new Map()
  for (const item of items) {
    const key = versionKey(item.tag)
    const label = key === 'other' ? 'Other' : key
    if (!seen.has(key)) {
      const g = { key, label, releases: [] }
      seen.set(key, g)
      groups.push(g)
    }
    seen.get(key).releases.push(item)
  }
  return groups
}

// Simple markdown-to-JSX renderer for GitHub release notes
function RenderMarkdown({ text }) {
  if (!text) return null

  // Split into lines and process
  let lines = text.split('\n')
  let elements = []
  let inCodeBlock = false
  let codeLines = []
  let codeLang = ''

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Code block toggle
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${i}`} className="my-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-300">
            <code>{codeLines.join('\n')}</code>
          </pre>
        )
        codeLines = []
        inCodeBlock = false
      } else {
        inCodeBlock = true
        codeLang = line.trim().replace('```', '')
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    // Skip top-level release title (# Release v1.x.x)
    if (/^#\s+Release\s+v/i.test(line.trim())) continue
    if (/^#\s+\*\*v/i.test(line.trim())) continue

    // Skip section headers like ## Features, ## Fixes (we handle these separately)
    if (/^##\s+/.test(line.trim())) continue

    // Sub-headers (### Something)
    if (/^###\s+/.test(line.trim())) {
      let text = line.replace(/^###\s+/, '').replace(/[🔹🚀🔧🛠️]/g, '').trim()
      text = renderInline(text)
      elements.push(
        <h4 key={`h-${i}`} className="mt-4 mb-1 text-sm font-semibold text-white">
          {text}
        </h4>
      )
      continue
    }

    // Empty lines
    if (line.trim() === '') continue

    // Bullet points
    if (/^\s*[-*]\s+/.test(line)) {
      let text = line.replace(/^\s*[-*]\s+/, '')
      elements.push(
        <li key={`li-${i}`} className="ml-4 text-sm text-slate-400">
          {renderInline(text)}
        </li>
      )
      continue
    }

    // Regular paragraph
    if (line.trim()) {
      elements.push(
        <p key={`p-${i}`} className="text-sm text-slate-400">
          {renderInline(line.trim())}
        </p>
      )
    }
  }

  return <div className="space-y-1">{elements}</div>
}

// Render inline markdown (bold, code, links)
function renderInline(text) {
  if (!text) return text

  // Remove emoji prefixes and GitHub colon-emoji syntax
  text = text.replace(/[🔹🚀🔧🛠️💎⚡]/g, '').trim()
  text = text.replace(/:small_blue_diamond:/g, '')
  text = text.replace(/:rocket:/g, '')
  text = text.replace(/:wrench:/g, '')
  text = text.replace(/:hammer_and_wrench:/g, '')
  text = text.replace(/:gem:/g, '')
  text = text.replace(/:zap:/g, '')
  text = text.replace(/:white_check_mark:/g, '')
  text = text.replace(/:warning:/g, '')
  text = text.replace(/:bug:/g, '')
  text = text.replace(/:sparkles:/g, '')
  text = text.replace(/:[a-z_]+:/g, '').trim()

  // Split on bold markers and inline code
  let parts = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Bold: **text**
    let boldMatch = remaining.match(/\*\*(.*?)\*\*/)
    // Inline code: `text`
    let codeMatch = remaining.match(/`(.*?)`/)

    // Find the earliest match
    let nextBold = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity
    let nextCode = codeMatch ? remaining.indexOf(codeMatch[0]) : Infinity

    if (nextBold === Infinity && nextCode === Infinity) {
      parts.push(remaining)
      break
    }

    if (nextBold <= nextCode && boldMatch) {
      if (nextBold > 0) parts.push(remaining.slice(0, nextBold))
      parts.push(
        <strong key={`b-${key++}`} className="font-semibold text-slate-200">
          {boldMatch[1]}
        </strong>
      )
      remaining = remaining.slice(nextBold + boldMatch[0].length)
    } else if (codeMatch) {
      if (nextCode > 0) parts.push(remaining.slice(0, nextCode))
      parts.push(
        <code key={`c-${key++}`} className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-300">
          {codeMatch[1]}
        </code>
      )
      remaining = remaining.slice(nextCode + codeMatch[0].length)
    }
  }

  return parts.length > 0 ? parts : text
}

function parseRelease(body) {
  if (!body) return []

  let sections = []
  let currentSection = null
  let currentContent = []

  for (let line of body.split('\n')) {
    // Detect section headers: ## 🚀 Features, ## 🔧 Enhancements, ## 🛠️ Fixes
    if (/^##\s+/.test(line.trim())) {
      if (currentSection) {
        sections.push({ type: currentSection, content: currentContent.join('\n') })
      }
      let header = line
        .replace(/^##\s+/, '')
        .replace(/[\p{Extended_Pictographic}\uFE0F]/gu, '')
        .trim()
      if (/feature/i.test(header)) currentSection = 'features'
      else if (/enhancement/i.test(header)) currentSection = 'enhancements'
      else if (/improvement/i.test(header)) currentSection = 'enhancements'
      else if (/fix/i.test(header)) currentSection = 'fixes'
      else currentSection = header.toLowerCase()
      currentContent = []
      continue
    }

    // Skip release title
    if (/^#\s+/.test(line.trim()) && !/^##/.test(line.trim())) continue

    if (currentSection) {
      currentContent.push(line)
    }
  }

  if (currentSection) {
    sections.push({ type: currentSection, content: currentContent.join('\n') })
  }

  return sections
}

const sectionStyles = {
  features: { label: 'Features', color: 'text-violet-400', badge: 'bg-violet-500/10 text-violet-400' },
  enhancements: { label: 'Enhancements', color: 'text-sky-400', badge: 'bg-sky-500/10 text-sky-400' },
  fixes: { label: 'Fixes', color: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-400' },
}

function ReleaseCard({ release, isLatest }) {
  // Initialise from `isLatest` only — reading `window.location.hash`
  // at render time would diverge between server and client and trip
  // a hydration mismatch. The deep-link auto-expand happens in the
  // effect below, on mount, after hydration is complete.
  let [expanded, setExpanded] = useState(isLatest)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const tag = decodeURIComponent(window.location.hash || '').slice(1)
    if (tag === release.tag) setExpanded(true)
  }, [release.tag])

  let sections = parseRelease(release.body)
  let sectionTypes = sections.map(s => s.type)

  return (
    <div
      id={release.tag}
      // Single uniform timeline color so the spine flows continuously
      // through every release. The latest release is distinguished by
      // the dot fill + the "Latest" pill below, not by recoloring the
      // line itself (which created visual jumps between cards).
      className="relative scroll-mt-24 border-l-2 border-slate-800 pl-8 pb-12"
    >
      <div
        className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 ${
          isLatest
            ? 'border-sky-400 bg-sky-400 ring-4 ring-sky-400/20'
            : 'border-slate-700 bg-slate-900'
        }`}
      />

      <div className="flex flex-wrap items-center gap-3">
        <Link
          href={`#${release.tag}`}
          className={`rounded-full px-3 py-1 text-sm font-bold transition-opacity hover:opacity-80 ${isLatest ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-300'}`}
          aria-label={`Permalink to ${release.tag}`}
        >
          {release.tag}
        </Link>
        <span className="text-sm text-slate-500">{formatDate(release.date)}</span>
        {isLatest && (
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
            Latest
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {sectionTypes.map(type => {
          let style = sectionStyles[type] || { label: type, badge: 'bg-slate-800 text-slate-400' }
          return (
            <span key={type} className={`rounded px-2 py-0.5 text-xs ${style.badge}`}>
              {style.label}
            </span>
          )
        })}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 rounded-md px-2 py-1 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-300"
      >
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
          viewBox="0 0 16 16" fill="none"
        >
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {expanded ? 'Hide details' : 'Show details'}
      </button>

      {expanded && (
        <div className="mt-4 space-y-6">
          {sections.map((section, idx) => {
            let style = sectionStyles[section.type] || { label: section.type, color: 'text-slate-300' }
            return (
              <div key={idx} className="rounded-lg border border-slate-800 p-4">
                <h3 className={`mb-3 text-sm font-bold uppercase tracking-wider ${style.color}`}>
                  {style.label}
                </h3>
                <RenderMarkdown text={section.content} />
              </div>
            )
          })}
        </div>
      )}

      <Link
        href={release.url}
        target="_blank"
        className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-sky-400"
      >
        View on GitHub
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
          <path d="M3.5 3.5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8.5 3.5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </Link>
    </div>
  )
}

// Right-rail timeline. Lists every month that contains a release, with
// a count badge. Active month is the one closest to the top of the
// viewport — same pattern as docs "On this page". Click → smooth-scroll
// to the month anchor; the URL hash updates so the navigation is
// shareable.
// Format a release date for the rail row — short, side-by-side with
// the version tag. Year is included because the rail spans multiple
// years; without it "Sep 2" reads ambiguously between releases. Using
// the apostrophe-year format ("Sep 2 '24") keeps the row compact.
function formatShortDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const md = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const yr = String(d.getUTCFullYear()).slice(-2)
  return `${md} '${yr}`
}

// Compute a major-line key like "v1.56.x" from a tag like "v1.56.4".
// Tags that don't parse fall into "other" so the rail still has a
// bucket to put them in.
function majorKey(tag) {
  const m = tag && /^(v\d+\.\d+)/.exec(tag)
  return m ? `${m[1]}.x` : 'other'
}

// Group releases by major-line. Order is preserved from the source
// array (newest first), so the first group is the most recent major.
function groupByMajor(items) {
  const groups = new Map()
  for (const r of items) {
    const key = majorKey(r.tag)
    if (!groups.has(key)) groups.set(key, [])
    groups.get(key).push(r)
  }
  return [...groups.entries()]
}

// Right rail — releases grouped by major-version line inside native
// <details>/<summary> blocks. The major containing the active tag (or
// the most recent major as a fallback) is open by default; older
// majors are collapsed and their entries dimmed. Clicking a row jumps
// straight to that release card; the page-side handler auto-extends
// pagination if needed.
function ReleaseRail({ items, activeKey, onClick }) {
  const grouped = groupByMajor(items)
  const activeMajor = majorKey(activeKey)
  const fallbackMajor = grouped[0]?.[0]
  const openMajor = grouped.some(([m]) => m === activeMajor)
    ? activeMajor
    : fallbackMajor

  return (
    <nav aria-label="All releases" className="text-sm">
      <p className="font-display text-xs font-medium uppercase tracking-wider text-slate-500">
        Browse by version
      </p>
      <div className="mt-4 space-y-2 border-l border-slate-800">
        {grouped.map(([major, entries]) => (
          <details
            key={major}
            open={major === openMajor}
            className="group -ml-px"
          >
            <summary className="flex cursor-pointer list-none items-center gap-2 border-l border-transparent py-1.5 pl-4 pr-2 text-xs font-medium text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200">
              <svg
                className="h-3 w-3 flex-none transition-transform duration-200 group-open:rotate-90"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M6 4l4 4-4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="font-mono">{major}</span>
              <span className="text-[10px] font-normal text-slate-600">
                ({entries.length})
              </span>
            </summary>
            <ol className="mt-1 space-y-1">
              {entries.map((r) => {
                const isActive = r.tag === activeKey
                const isDim = major !== activeMajor && !isActive
                return (
                  <li key={r.tag}>
                    <Link
                      href={`#${r.tag}`}
                      onClick={(e) => onClick?.(e, r.tag)}
                      className={`-ml-px flex items-center justify-between gap-3 border-l py-1.5 pl-7 pr-2 text-xs transition-colors ${
                        isActive
                          ? 'border-sky-500 font-semibold text-sky-400'
                          : isDim
                          ? 'border-transparent text-slate-600 hover:border-slate-700 hover:text-slate-400'
                          : 'border-transparent text-slate-500 hover:border-slate-600 hover:text-slate-300'
                      }`}
                    >
                      <span className="font-mono">{r.tag}</span>
                      <span
                        className={`text-[10px] ${
                          isDim ? 'text-slate-700' : 'text-slate-500'
                        }`}
                      >
                        {formatShortDate(r.date)}
                      </span>
                    </Link>
                  </li>
                )
              })}
            </ol>
          </details>
        ))}
      </div>
    </nav>
  )
}

// Round up `target` to the nearest PAGE_SIZE multiple, capped at the
// total. Keeps the visible window aligned with the chunk boundary
// after a deep-link auto-extend.
function alignToPage(target, total) {
  const aligned = Math.ceil(target / PAGE_SIZE) * PAGE_SIZE
  return Math.min(aligned, total)
}

export default function ChangelogPage() {
  const [shown, setShown] = useState(Math.min(PAGE_SIZE, releases.length))

  // Body groups by minor-version line (v1.56.x, v1.55.x, …) — the
  // axis the rail navigates by. Month is per-release metadata only.
  // The rail uses the full release set so every version line is one
  // click away regardless of pagination.
  const visibleReleases = releases.slice(0, shown)
  const groups = groupByVersion(visibleReleases)
  // Rail tracks the currently-visible release tag (set by scrollspy).
  // Initialised to the latest release so the rail highlights the
  // section the user lands on.
  const [activeKey, setActiveKey] = useState(releases[0]?.tag)

  // Track which release card is currently in view so the rail
  // highlights it. We watch the per-release anchors (id={release.tag})
  // — each card has scroll-mt-24, so a 120px threshold lines up with
  // the card's effective top edge after sticky-header offset.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const cards = visibleReleases
      .map((r) => document.getElementById(r.tag))
      .filter(Boolean)

    function onScroll() {
      const offset = 120
      let current = cards[0]
      for (const c of cards) {
        if (c.getBoundingClientRect().top - offset <= 0) current = c
        else break
      }
      if (current) setActiveKey(current.id)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [visibleReleases])

  // Make hash deep-links work even when the target release sits past
  // the initial pagination window. We expand `shown` to include the
  // target before scrolling, so /changelog#v1.30.0 still works for an
  // older release that wouldn't otherwise be in the DOM yet.
  useEffect(() => {
    if (typeof window === 'undefined') return
    const hash = decodeURIComponent(window.location.hash || '')
    if (!hash) return
    const tag = hash.slice(1)
    const idx = releases.findIndex((r) => r.tag === tag)
    if (idx === -1) return

    if (idx >= shown) {
      // Auto-extend to include the target. Re-run of this effect
      // (after `shown` updates) handles the actual scroll.
      setShown(alignToPage(idx + 1, releases.length))
      return
    }

    const target = document.getElementById(tag)
    if (target) {
      // Defer one tick so layout has settled.
      setTimeout(() => target.scrollIntoView({ behavior: 'instant', block: 'start' }), 0)
    }
  }, [shown])

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto flex max-w-screen-xl gap-12 px-4 py-16 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-4">
            <h1 className="font-display text-4xl font-bold tracking-tight text-white">
              Changelog
            </h1>
            <Link
              href="/changelog.xml"
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-800 px-3 py-1.5 text-xs text-slate-400 transition-colors hover:border-amber-500/40 hover:text-amber-400"
              aria-label="Subscribe via RSS"
            >
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 3a16 16 0 0 1 16 16 1 1 0 0 1-2 0A14 14 0 0 0 5 5a1 1 0 0 1 0-2Zm0 6a10 10 0 0 1 10 10 1 1 0 0 1-2 0A8 8 0 0 0 5 11a1 1 0 0 1 0-2Zm1.5 8a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z" />
              </svg>
              RSS
            </Link>
          </div>
          <p className="mt-3 text-lg text-slate-400">
            Release notes and version history for GoFr. Pick a version from the right rail or deep-link to a specific tag (e.g. <code className="rounded bg-slate-800 px-1 text-xs text-slate-300">/changelog#{releases[0]?.tag || 'v1.0.0'}</code>).
          </p>

          {/* Version-grouped release list. Each minor-version line */}
          {/* gets a section header (id="version-vMAJ.MIN") so the */}
          {/* right rail can link directly to it. */}
          <div className="mt-12">
            {groups.map((group, gIdx) => (
              <section key={group.key} className="mb-2">
                <h2
                  id={`version-${group.key}`}
                  className="scroll-mt-24 -ml-px border-l-2 border-slate-800 bg-slate-900/80 pl-8 pb-4 pt-2 font-display text-sm font-mono font-semibold tracking-wider text-slate-400 backdrop-blur"
                >
                  {group.label}
                  <span className="ml-2 text-xs font-normal text-slate-600">
                    {group.releases.length} release{group.releases.length === 1 ? '' : 's'}
                  </span>
                </h2>
                {group.releases.map((release, rIdx) => (
                  <ReleaseCard
                    key={release.tag}
                    release={release}
                    isLatest={gIdx === 0 && rIdx === 0}
                  />
                ))}
              </section>
            ))}
          </div>

          {/* Pagination footer. "Show more" advances by PAGE_SIZE; */}
          {/* once everything is shown the button hides. The "X of Y" */}
          {/* counter doubles as a status line so deep-link auto- */}
          {/* extends are visible to the user. */}
          <div className="mt-8 flex flex-col items-center gap-3 border-t border-slate-800 pt-6">
            <p className="text-xs text-slate-500">
              Showing {Math.min(shown, releases.length)} of {releases.length} releases
            </p>
            {shown < releases.length && (
              <button
                onClick={() =>
                  setShown((s) => Math.min(s + PAGE_SIZE, releases.length))
                }
                className="rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-sky-500/40 hover:text-sky-300"
              >
                Show {Math.min(PAGE_SIZE, releases.length - shown)} older
              </button>
            )}
            <Link
              href="https://github.com/gofr-dev/gofr/releases"
              target="_blank"
              className="text-sm text-slate-400 transition-colors hover:text-sky-400"
            >
              View all releases on GitHub →
            </Link>
          </div>
        </div>

        {/* Sticky right rail — hides on small screens. Mirrors the */}
        {/* docs "On this page" treatment. With ~28+ months in the */}
        {/* index, the rail itself needs to scroll independently of */}
        {/* the page so distant months stay reachable. */}
        <aside className="hidden w-56 flex-none xl:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pr-2">
            <ReleaseRail
              items={releases}
              activeKey={activeKey}
              onClick={(e, tag) => {
                // If the target release sits past the current
                // pagination window, extend `shown` to include it
                // before letting the anchor jump take effect.
                const idx = releases.findIndex((r) => r.tag === tag)
                if (idx === -1) return

                if (idx >= shown) {
                  e.preventDefault()
                  setShown(alignToPage(idx + 1, releases.length))
                  setTimeout(() => {
                    const target = document.getElementById(tag)
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
                      history.replaceState(null, '', `#${tag}`)
                    }
                  }, 0)
                }
              }}
            />
          </div>
        </aside>
      </div>
    </div>
  )
}
