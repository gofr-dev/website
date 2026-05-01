'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import data from '@/data/roadmap.json'

// Color hint per label group — keeps tags scannable without inventing
// a new color system. Anything not listed falls back to slate.
const labelTone = (l) => {
  const x = l.toLowerCase()
  if (/^enhancement$/.test(x)) return 'bg-emerald-500/10 text-emerald-400'
  if (/datasource|database|sql|redis|mongo|cassandra|clickhouse|kafka|pub|nats/.test(x))
    return 'bg-amber-500/10 text-amber-400'
  if (/observ|trace|metric|log/.test(x)) return 'bg-cyan-500/10 text-cyan-400'
  if (/service|http|grpc|graphql|websocket/.test(x)) return 'bg-violet-500/10 text-violet-400'
  if (/security|auth|rbac|cors/.test(x)) return 'bg-red-500/10 text-red-400'
  if (/cli|tools|devops|github_actions/.test(x)) return 'bg-sky-500/10 text-sky-400'
  if (/good first issue|help wanted/.test(x)) return 'bg-pink-500/10 text-pink-400'
  if (/bug|fix/.test(x)) return 'bg-orange-500/10 text-orange-400'
  return 'bg-slate-500/10 text-slate-300'
}

function formatDate(s) {
  if (!s) return ''
  try {
    return new Date(s).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  } catch {
    return s
  }
}

function timeAgo(s) {
  if (!s) return ''
  const d = new Date(s)
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000)
  if (days < 1) return 'today'
  if (days < 2) return 'yesterday'
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months}mo ago`
  const years = Math.floor(days / 365)
  return `${years}y ago`
}

function IssueCard({ item }) {
  return (
    <Link
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block rounded-xl border border-slate-800 p-4 transition-colors hover:border-sky-500/40"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 font-mono text-xs text-slate-600">#{item.number}</span>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium text-slate-200 group-hover:text-sky-300">
            {item.title}
          </h3>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            {item.labels.slice(0, 5).map((l) => (
              <span
                key={l}
                className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${labelTone(l)}`}
              >
                {l}
              </span>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-slate-500">
            <span>updated {timeAgo(item.updated_at)}</span>
            {item.comments > 0 && (
              <span>· {item.comments} comment{item.comments === 1 ? '' : 's'}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}

export default function RoadmapPage() {
  const milestones = data?.milestones ?? []
  const items = data?.items ?? []
  const fetchedAt = data?.fetchedAt
  const repo = data?.repo || 'gofr-dev/gofr'

  // Filter chips: "All" + each unique label + a "No milestone" toggle.
  const allLabels = useMemo(() => {
    const counts = {}
    for (const i of items) for (const l of i.labels) counts[l] = (counts[l] || 0) + 1
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([l]) => l)
  }, [items])

  const [active, setActive] = useState(null) // active label filter or null

  const visible = useMemo(
    () => (active ? items.filter((i) => i.labels.includes(active)) : items),
    [items, active],
  )

  // Group visible items: each milestone → its items, then a final
  // "no milestone" group.
  const grouped = useMemo(() => {
    const byMs = new Map()
    for (const m of milestones) byMs.set(m.title, { milestone: m, items: [] })
    const noMs = []
    for (const it of visible) {
      if (it.milestone && byMs.has(it.milestone)) byMs.get(it.milestone).items.push(it)
      else noMs.push(it)
    }
    const groups = [...byMs.values()].filter((g) => g.items.length)
    if (noMs.length) groups.push({ milestone: null, items: noMs })
    return groups
  }, [milestones, visible])

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white">
            Roadmap
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            GoFr already powers production microservices today. The
            roadmap covers what&rsquo;s being added next &mdash; more datasources,
            integrations, protocols, and operational ergonomics.
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Generated automatically from open issues on{' '}
            <Link
              href={`https://github.com/${repo}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300"
            >
              {repo}
            </Link>
            {fetchedAt && (
              <>
                {' '}
                · last refreshed {formatDate(fetchedAt)}
              </>
            )}
            .
          </p>
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="mt-12 rounded-xl border border-slate-800 p-8 text-center text-slate-400">
            No roadmap items right now. The roadmap is built from open
            issues labeled <code className="font-mono">enhancement</code>{' '}
            (or <code className="font-mono">roadmap</code>) on{' '}
            <Link
              href={`https://github.com/${repo}/issues`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300"
            >
              {repo}
            </Link>
            . Open one to suggest a feature.
          </div>
        )}

        {/* Milestone progress strip */}
        {milestones.length > 0 && (
          <div className="mt-12">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Milestones
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              {milestones.map((m) => (
                <Link
                  key={m.title}
                  href={m.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-slate-800 p-4 transition-colors hover:border-sky-500/40"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm font-medium text-white group-hover:text-sky-300">
                      {m.title}
                    </h3>
                    <span className="text-xs text-slate-500">
                      {m.due_on ? `due ${formatDate(m.due_on)}` : 'no due date'}
                    </span>
                  </div>
                  {m.description && (
                    <p className="mt-1 line-clamp-2 text-xs text-slate-400">
                      {m.description}
                    </p>
                  )}
                  <div className="mt-3">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className="h-full bg-sky-400"
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                    <p className="mt-1.5 text-[11px] text-slate-500">
                      {m.closed_issues} of {m.open_issues + m.closed_issues}{' '}
                      done · {m.progress}%
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Filter chips */}
        {items.length > 0 && allLabels.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2">
            <button
              onClick={() => setActive(null)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                !active
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All ({items.length})
            </button>
            {allLabels.map((l) => {
              const count = items.filter((i) => i.labels.includes(l)).length
              return (
                <button
                  key={l}
                  onClick={() => setActive(active === l ? null : l)}
                  className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    active === l
                      ? 'bg-sky-500 text-white'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {l} ({count})
                </button>
              )
            })}
          </div>
        )}

        {/* Grouped issues */}
        <div className="mt-8 space-y-12">
          {grouped.map((g) => (
            <section key={g.milestone?.title || 'no-milestone'}>
              <h2 className="font-display text-lg font-semibold text-white">
                {g.milestone ? g.milestone.title : 'Without a milestone'}
              </h2>
              {g.milestone?.description && (
                <p className="mt-1 text-sm text-slate-400">{g.milestone.description}</p>
              )}
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {g.items.map((item) => (
                  <IssueCard key={item.number} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href={`https://github.com/${repo}/issues/new/choose`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-sky-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-sky-200"
          >
            Suggest a feature →
          </Link>
        </div>
      </div>
    </div>
  )
}
