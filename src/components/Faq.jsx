'use client'

import { Children, isValidElement, useState } from 'react'
import clsx from 'clsx'

// Walks React children to find `<FaqItem question="…">` nodes and
// extracts question + answer text for FAQPage JSON-LD. Markdoc emits
// arbitrary nested wrappers (paragraph nodes, fragments) so we recurse
// rather than only inspecting direct children.
function extractFaqItems(children) {
  const items = []

  function visit(node) {
    if (Array.isArray(node)) {
      node.forEach(visit)
      return
    }
    if (!isValidElement(node)) return

    const q = node.props?.question
    if (typeof q === 'string' && q.length > 0) {
      const a = node.props.answer ?? toPlainText(node.props.children)
      if (a) items.push({ question: q, answer: a })
      return
    }

    if (node.props?.children) visit(node.props.children)
  }

  visit(children)
  return items
}

function toPlainText(node) {
  if (node == null) return ''
  if (typeof node === 'string') return node
  if (typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(toPlainText).join('')
  if (isValidElement(node)) return toPlainText(node.props?.children)
  return ''
}

// FaqItem renders a single collapsible Q/A. Visual treatment matches the
// existing card vocabulary (rounded-xl border, slate-200/slate-800).
// JSON-LD for FAQPage schema is emitted by the parent FaqList so search
// engines and AI engines can surface these questions as rich results.
function FaqItem({ question, answer, children }) {
  const [open, setOpen] = useState(false)
  const body = answer ?? children

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

// FaqList wraps a series of `{% faq %}` blocks and emits FAQPage JSON-LD.
// AI search engines and Google's AI Overviews give significant weight to
// pages that publish authoritative FAQPage schema.
//
// Items can be supplied explicitly via the `items` prop (Markdoc tag
// attribute) OR inferred from FaqItem children. We prefer the explicit
// list when provided and fall back to a walk so authors can just write
// `{% faq %}{% faq-item question="…" %}…{% /faq-item %}{% /faq %}` and
// schema emission Just Works.
export function FaqList({ items = [], children }) {
  const ldItems = items.length ? items : extractFaqItems(children)

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

export { FaqItem }
