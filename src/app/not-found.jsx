'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search } from '@/components/Search'

// Useful 404 — gives the visitor what they probably wanted (search,
// quick start, examples, community) instead of a dead end. Common
// pattern on framework sites: every dead link should still help.
const helpfulLinks = [
  {
    title: 'Quick Start',
    description: 'Build your first GoFr server in under 5 minutes.',
    href: '/docs/quick-start/introduction',
  },
  {
    title: 'Documentation',
    description: 'Full reference: HTTP, gRPC, GraphQL, datasources, more.',
    href: '/docs',
  },
  {
    title: 'Examples',
    description: 'Working projects you can clone and run.',
    href: '/examples',
  },
]

export default function NotFound() {
  const pathname = usePathname() || ''
  // Pre-fill issue body with the broken path so reports are actionable.
  const issueUrl = `https://github.com/gofr-dev/gofr/issues/new?title=${encodeURIComponent(
    `Broken link: ${pathname}`,
  )}&body=${encodeURIComponent(
    `The path \`${pathname}\` returns 404 on gofr.dev.\n\nReferrer: <please paste>`,
  )}`

  return (
    <div className="min-h-[70vh] bg-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-wider text-slate-500">
            404
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-white">
            We couldn’t find that page
          </h1>
          {pathname && (
            <p className="mt-2 text-sm text-slate-500">
              <code className="rounded bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                {pathname}
              </code>{' '}
              isn’t a route we recognize.
            </p>
          )}
        </div>

        {/* Search — the most useful thing on a 404. */}
        <div className="mt-10">
          <Search />
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {helpfulLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group rounded-xl border border-slate-800 p-5 transition-colors hover:border-sky-500/50"
            >
              <p className="font-display text-sm font-medium text-white">
                {l.title}
              </p>
              <p className="mt-1 text-xs text-slate-400">{l.description}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <Link
            href="/"
            className="rounded-full bg-sky-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-sky-200"
          >
            Go to homepage
          </Link>
          <Link
            href={issueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-slate-500 hover:text-slate-300"
          >
            Report this broken link →
          </Link>
        </div>
      </div>
    </div>
  )
}
