'use client'

import { useState } from 'react'
import Link from 'next/link'
import examples from './examples.json'

const tagColors = {
  'REST': 'bg-emerald-500/10 text-emerald-400',
  'gRPC': 'bg-violet-500/10 text-violet-400',
  'Pub/Sub': 'bg-sky-500/10 text-sky-400',
  'Messaging': 'bg-sky-500/10 text-sky-400',
  'Database': 'bg-amber-500/10 text-amber-400',
  'Redis': 'bg-red-500/10 text-red-400',
  'Communication': 'bg-blue-500/10 text-blue-400',
  'Migrations': 'bg-amber-500/10 text-amber-400',
  'GraphQL': 'bg-pink-500/10 text-pink-400',
  'WebSocket': 'bg-indigo-500/10 text-indigo-400',
  'Background': 'bg-slate-500/10 text-slate-400',
  'Scheduling': 'bg-slate-500/10 text-slate-400',
  'Observability': 'bg-cyan-500/10 text-cyan-400',
  'Metrics': 'bg-cyan-500/10 text-cyan-400',
  'Resilience': 'bg-orange-500/10 text-orange-400',
  'Security': 'bg-red-500/10 text-red-400',
  'Middleware': 'bg-purple-500/10 text-purple-400',
  'Files': 'bg-teal-500/10 text-teal-400',
  'Storage': 'bg-teal-500/10 text-teal-400',
  'Data Binding': 'bg-lime-500/10 text-lime-400',
  'Templates': 'bg-rose-500/10 text-rose-400',
  'Frontend': 'bg-rose-500/10 text-rose-400',
  'CLI': 'bg-slate-500/10 text-slate-300',
  'Tools': 'bg-slate-500/10 text-slate-400',
  'Getting Started': 'bg-emerald-500/10 text-emerald-400',
}

const allTags = [...new Set(examples.flatMap((e) => e.tags))]

export default function ExamplesPage() {
  let [activeTag, setActiveTag] = useState(null)

  let filtered = activeTag
    ? examples.filter((e) => e.tags.includes(activeTag))
    : examples

  let featured = examples.filter((e) => e.featured)

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white">
            Examples & Recipes
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            Learn GoFr by example. Each recipe is a working project you can clone and run.
          </p>
          {/* Quick clone snippet — answers the "ok how do I run these?" question */}
          {/* immediately, without making the visitor hunt for instructions. */}
          <div className="mx-auto mt-6 max-w-2xl">
            <div className="flex items-center gap-3 rounded-lg border border-slate-800 bg-slate-950/60 p-3 text-left font-mono text-xs text-slate-400">
              <span className="flex-none select-none text-slate-600">$</span>
              {/* whitespace-nowrap so the command never breaks mid-word; */}
              {/* the code element scrolls horizontally if it's too long. */}
              <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap">
                git clone https://github.com/gofr-dev/gofr
              </code>
              <Link
                href="https://github.com/codespaces/new?repo=gofr-dev/gofr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-none items-center gap-1 rounded-md bg-slate-800 px-2.5 py-1 text-[11px] font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
              >
                <svg className="h-3 w-3" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M2 5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5Zm3-1.5A1.5 1.5 0 0 0 3.5 5v3A1.5 1.5 0 0 0 5 9.5h6A1.5 1.5 0 0 0 12.5 8V5A1.5 1.5 0 0 0 11 3.5H5Z" />
                  <path d="M0 11.25A2.25 2.25 0 0 1 2.25 9h11.5A2.25 2.25 0 0 1 16 11.25v1.5A2.25 2.25 0 0 1 13.75 15H2.25A2.25 2.25 0 0 1 0 12.75v-1.5Z" />
                </svg>
                Codespaces
              </Link>
            </div>
            <p className="mt-2 text-center text-xs text-slate-500">
              Examples live under <code className="font-mono">gofr/examples</code> — pick any subfolder and run <code className="font-mono">go run main.go</code>.
            </p>
          </div>
        </div>

        {/* Featured */}
        {!activeTag && (
          <div className="mt-12">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Start here
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {featured.map((example) => (
                <Link
                  key={example.title}
                  href={example.href}
                  target="_blank"
                  className="group relative block rounded-xl border border-sky-500/30 bg-sky-500/5 p-5 transition-all hover:border-transparent"
                >
                  <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 transition-opacity [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
                  <div className="relative">
                    <h3 className="font-display text-base font-medium text-white">{example.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">{example.description}</p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {example.tags.map((tag) => (
                        <span key={tag} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tagColors[tag] || 'bg-slate-800 text-slate-400'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Tag filter */}
        <div className="mt-10 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              !activeTag ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                activeTag === tag ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* All examples */}
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((example) => (
            <Link
              key={example.title}
              href={example.href}
              target="_blank"
              className="group relative block rounded-xl border border-slate-800 p-5 transition-all hover:border-transparent"
            >
              <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 transition-opacity [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
              <div className="relative">
                <h3 className="font-display text-sm font-medium text-white">{example.title}</h3>
                <p className="mt-1 text-xs text-slate-400 line-clamp-2">{example.description}</p>
                <div className="mt-3 flex flex-wrap gap-1">
                  {example.tags.map((tag) => (
                    <span key={tag} className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${tagColors[tag] || 'bg-slate-800 text-slate-400'}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="https://github.com/gofr-dev/gofr/tree/main/examples"
            target="_blank"
            className="text-sm text-slate-400 transition-colors hover:text-sky-400"
          >
            Browse all examples on GitHub →
          </Link>
        </div>
      </div>
    </div>
  )
}
