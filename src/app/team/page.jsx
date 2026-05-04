'use client'

import Link from 'next/link'
import data from '@/data/team-enriched.json'

// Initials avatar fallback for team members without a GitHub handle
// (so we don't pull a profile photo). Matches the existing design
// vocabulary — slate surface, large display font.
function InitialsAvatar({ name, className = '' }) {
  const initials = (name || '?')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <div
      className={`flex items-center justify-center rounded-full bg-slate-800 text-slate-300 ${className}`}
      aria-hidden="true"
    >
      <span className="font-display text-lg font-semibold">{initials}</span>
    </div>
  )
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  )
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function TeamCard({ member }) {
  const gh = member.github_data
  // Photo precedence: explicit `photo` in team.json (e.g. for members
  // without a GitHub handle) → GitHub avatar → initials fallback.
  const avatar = member.photo || gh?.avatar_url

  return (
    <div className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-colors hover:border-sky-500/40 hover:bg-slate-900/70">
      {/* Header row: avatar + identity. Left-aligned reads better */}
      {/* than centred when there's location prose below. */}
      <div className="flex items-center gap-4">
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatar}
            alt={`${member.name} avatar`}
            width={72}
            height={72}
            className="h-[72px] w-[72px] flex-none rounded-full bg-slate-800 object-cover ring-1 ring-slate-700 transition-all group-hover:ring-2 group-hover:ring-sky-400"
            loading="lazy"
          />
        ) : (
          <InitialsAvatar name={member.name} className="h-[72px] w-[72px] flex-none" />
        )}
        <div className="min-w-0">
          <p className="font-display text-base font-semibold text-white">
            {member.name}
          </p>
          <p className="mt-0.5 text-[11px] font-medium uppercase tracking-wider text-sky-400">
            {member.role}
          </p>
          {gh?.location && (
            <p className="mt-1 truncate text-xs text-slate-500">
              {gh.location}
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-3 border-t border-slate-800/80 pt-4">
        {gh?.profile_url && (
          <Link
            href={gh.profile_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on GitHub`}
            className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center p-2 -m-2 text-slate-500 transition-colors hover:text-slate-300"
          >
            <GithubIcon className="h-4 w-4" />
          </Link>
        )}
        {member.linkedin && (
          <Link
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center p-2 -m-2 text-slate-500 transition-colors hover:text-blue-400"
          >
            <LinkedinIcon className="h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

// Order the core team for display: Creator pinned first, then
// Maintainers sorted by their commit count to gofr-dev/gofr (highest
// first). Anyone without a contribution number sinks to the bottom of
// the maintainer block. Source-of-truth ordering in team.json is left
// alone so this is purely a render-time sort.
function sortTeam(team) {
  const isCreator = (m) => /creator/i.test(m.role || '')
  const commits = (m) => m.github_data?.gofr_contributions ?? -1

  return [...team].sort((a, b) => {
    if (isCreator(a) && !isCreator(b)) return -1
    if (!isCreator(a) && isCreator(b)) return 1
    return commits(b) - commits(a)
  })
}

export default function TeamPage() {
  const team = sortTeam(data?.team ?? [])
  const contributors = data?.contributors ?? []

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white">
            The team
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            GoFr is built by a small core team and a wider community of
            contributors. Here are the people behind it.
          </p>
        </div>

        {/* Core team — auto-derives column count from team.length so */}
        {/* small teams stay centered (e.g. 3 → grid-cols-3, 4 → -4). */}
        <div className="mt-12">
          <div
            className={`mx-auto grid gap-4 sm:grid-cols-2 ${
              team.length <= 3
                ? 'lg:grid-cols-3 lg:max-w-3xl'
                : team.length === 4
                ? 'lg:grid-cols-4'
                : 'lg:grid-cols-3'
            }`}
          >
            {team.map((m) => (
              <TeamCard key={m.name} member={m} />
            ))}
          </div>
        </div>

        {/* Top contributors — visual hierarchy step between the */}
        {/* maintainer cards above (large, with bio + socials) and */}
        {/* the full contributor flow below (40px avatar wall). */}
        {/* */}
        {/* Ranking is a composite score computed at fetch time: */}
        {/*   1·commits + 5·PRs merged + 2·reviews + 0.5·comments */}
        {/* The fetch script (utils/fetch-team.mjs) scores the top 15 */}
        {/* by raw commit count and re-sorts by composite, so a heavy */}
        {/* reviewer with modest commits surfaces above a one-time */}
        {/* bulk-commit author. The footnote under the heading sets */}
        {/* expectations about what's measured. */}
        {contributors.length > 0 && (
          <div className="mt-20">
            <h2 className="text-center font-display text-2xl font-bold text-white">
              Top contributors
            </h2>
            <p className="mt-2 text-center text-sm text-slate-400">
              Ranked by GitHub-visible contributions to{' '}
              <Link
                href="https://github.com/gofr-dev/gofr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300"
              >
                gofr-dev/gofr
              </Link>
              {' '}— commits, merged PRs, reviews, and comments combined.
            </p>

            <div className="mx-auto mt-8 grid max-w-4xl gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
              {contributors.slice(0, 5).map((c) => {
                // Build a tiny secondary line that surfaces whichever
                // signal is non-zero beyond commits — keeps the card
                // honest without crowding the layout.
                const extras = []
                if (c.prs_merged) extras.push(`${c.prs_merged} PR${c.prs_merged === 1 ? '' : 's'}`)
                if (c.reviews_authored) extras.push(`${c.reviews_authored} review${c.reviews_authored === 1 ? '' : 's'}`)
                return (
                  <Link
                    key={c.login}
                    href={c.profile_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col items-center rounded-xl border border-slate-800 bg-slate-900/40 p-4 text-center transition-colors hover:border-sky-500/40"
                    title={`${c.contributions} commits · ${c.prs_merged || 0} PRs · ${c.reviews_authored || 0} reviews · ${c.comments_authored || 0} comments`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.avatar_url}
                      alt={`${c.login} avatar`}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-full bg-slate-800 ring-1 ring-slate-700 transition-all group-hover:ring-2 group-hover:ring-sky-400"
                      loading="lazy"
                    />
                    <p className="mt-3 truncate font-display text-sm font-semibold text-white">
                      {c.login}
                    </p>
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-sky-400">
                      {c.contributions} commits
                    </p>
                    {extras.length > 0 && (
                      <p className="mt-0.5 text-[10px] text-slate-500">
                        {extras.join(' · ')}
                      </p>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Contributors grid */}
        {contributors.length > 0 && (
          <div className="mt-16">
            <h2 className="text-center font-display text-2xl font-bold text-white">
              {contributors.length}+ contributors
            </h2>
            <p className="mt-2 text-center text-sm text-slate-400">
              Everyone who has shipped code, docs, or community work to{' '}
              <Link
                href="https://github.com/gofr-dev/gofr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:text-sky-300"
              >
                gofr-dev/gofr
              </Link>
              .
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {contributors.map((c) => (
                <Link
                  key={c.login}
                  href={c.profile_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${c.login} · ${c.contributions} contributions`}
                  className="group block"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.avatar_url}
                    alt={c.login}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full bg-slate-800 ring-1 ring-slate-700 transition-all group-hover:ring-2 group-hover:ring-sky-400"
                    loading="lazy"
                  />
                </Link>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="https://github.com/gofr-dev/gofr/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-sky-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-sky-200"
              >
                Contribute to GoFr →
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
