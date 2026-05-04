'use client'

import { usePathname } from 'next/navigation'

import { navigation } from '@/lib/navigation'

export function DocsHeader({ title }) {
  let pathname = usePathname()
  let section = navigation.find((section) =>
    section.links.find((link) => link.href === pathname),
  )
  let link = section?.links?.find((link) => link.href === pathname)

  if (!title && !section) {
    return null
  }

  // NOTE: do NOT render <title> or <meta description> from this
  // component. Next.js's metadata API (per-page `metadata` exports
  // and the Markdoc frontmatter → metadata bridge in next.config.mjs)
  // already injects a single canonical pair into <head>. Rendering
  // them here too produced duplicate <title>/<meta description>
  // tags in the served HTML — Google was free to pick the wrong one,
  // and the page-specific tag was being out-ranked by the site
  // default. Keep this component purely for the visible header chrome
  // (section eyebrow + h1).
  return (
    <header className="mb-9 space-y-1">
      {section && (
        <p className="font-display text-sm font-medium text-sky-500">
          {section.title}
        </p>
      )}
      {title && (
        <h1 className="font-display text-3xl tracking-tight text-slate-900 dark:text-white">
          {title}
        </h1>
      )}
    </header>
  )
}
