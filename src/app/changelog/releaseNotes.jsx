import React from 'react'
import Markdoc from '@markdoc/markdoc'

import { AutoLink } from '@/components/AutoLink'
import { Fence } from '@/components/Fence'
import { Prose } from '@/components/Prose'

import {
  normalizeReleaseMarkdown,
  releaseMarkdocConfig,
} from './releaseMarkdown.mjs'

const components = { AutoLink, Fence }

export function ReleaseNotes({ tag, source }) {
  // Server component: this runs at build time only.
  const ast = Markdoc.parse(normalizeReleaseMarkdown(source))

  // Markdoc renders around what it can't parse and silently drops it, so
  // fail the build instead and name the release that needs attention.
  const critical = Markdoc.validate(ast, releaseMarkdocConfig).filter(
    (e) => e.error.level === 'critical',
  )
  if (critical.length > 0) {
    const detail = critical
      .map((e) => `line ${(e.lines?.[0] ?? 0) + 1}: ${e.error.message}`)
      .join('; ')
    throw new Error(`changelog: release notes of ${tag} don't parse: ${detail}`)
  }
  const content = Markdoc.renderers.react(
    Markdoc.transform(ast, releaseMarkdocConfig),
    React,
    { components },
  )

  // The changelog is always dark, whatever the site theme is, so the
  // `dark` class pins the prose styles to their dark variants.
  return (
    <div className="dark">
      <Prose className="prose-sm text-slate-400 prose-headings:mb-2 prose-headings:mt-5 prose-headings:text-slate-100 prose-p:my-2 prose-strong:text-slate-200 prose-ol:my-2 prose-ul:my-2 prose-li:my-0.5 prose-table:my-3 prose-img:my-3">
        {content}
      </Prose>
    </div>
  )
}
