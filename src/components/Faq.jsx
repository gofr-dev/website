'use client'

import { Children, createContext, useContext, useMemo, useState } from 'react'
import clsx from 'clsx'

// Filter context lets a single page-level <FaqSearch> input drive all
// {% faq %} blocks below it. Each FaqItem checks whether its question
// matches the current query and hides itself when it doesn't.
const FilterContext = createContext('')

// FaqItem renders a single collapsible Q/A. Visual treatment matches the
// existing card vocabulary (rounded-xl border, slate-200/slate-800).
// JSON-LD for FAQPage schema is emitted by the parent FaqList so search
// engines and AI engines can surface these questions as rich results.
function FaqItem({ question, answer, children }) {
  const [open, setOpen] = useState(false)
  const body = answer ?? children
  const filter = useContext(FilterContext)

  // Build a lowercase searchable string from the question + a best-effort
  // text approximation of the body. We intentionally don't deeply walk
  // children — question match is enough for the common "where is X?" case.
  const searchable = useMemo(() => {
    const parts = [question || '']
    if (typeof body === 'string') parts.push(body)
    return parts.join(' ').toLowerCase()
  }, [question, body])

  if (filter && !searchable.includes(filter)) return null

  return (
    <div className="not-prose rounded-xl border border-slate-200 dark:border-slate-800">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 rounded-xl px-5 py-4 text-left text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50 dark:text-white dark:hover:bg-slate-800/40"
      >
        <span>{question}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={clsx(
            'h-3 w-3 flex-none text-slate-400 transition-transform',
            open && 'rotate-180',
          )}
        >
          <path
            d="M2 4l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>
      {open && (
        <div className="prose-sm border-t border-slate-200 px-5 py-4 text-sm text-slate-700 dark:border-slate-800 dark:text-slate-400">
          {body}
        </div>
      )}
    </div>
  )
}

// Page-level search input. Drop one `{% faq-search /%}` near the top of
// the FAQ page; it filters every FaqItem on the page through context.
function FaqSearchProvider({ children }) {
  const [q, setQ] = useState('')
  return (
    <FilterContext.Provider value={q.trim().toLowerCase()}>
      <div className="not-prose mb-6">
        <label htmlFor="faq-search" className="sr-only">
          Search FAQ
        </label>
        <div className="relative">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="currentColor"
          >
            <path d="M9 3a6 6 0 1 0 3.69 10.74l3.28 3.28a1 1 0 0 0 1.42-1.42l-3.28-3.28A6 6 0 0 0 9 3Zm-4 6a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z" />
          </svg>
          <input
            id="faq-search"
            type="search"
            placeholder="Search questions…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-white dark:placeholder-slate-500"
          />
        </div>
      </div>
      {children}
    </FilterContext.Provider>
  )
}

// FaqList wraps a series of `{% faq %}` blocks and emits FAQPage JSON-LD.
// AI search engines and Google's AI Overviews give significant weight to
// pages that publish authoritative FAQPage schema.
export function FaqList({ items = [], children }) {
  const ldItems = items.length ? items : []

  const jsonLd = ldItems.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: ldItems.map((it) => ({
          '@type': 'Question',
          name: it.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: it.answer,
          },
        })),
      }
    : null

  return (
    <section className="my-10">
      <h2 className="mb-4 font-display text-xl text-slate-900 dark:text-white">
        Frequently asked
      </h2>
      <div className="not-prose flex flex-col gap-3">{children}</div>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </section>
  )
}

export { FaqItem, FaqSearchProvider }
