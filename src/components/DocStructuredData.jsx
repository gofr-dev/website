'use client'

import { usePathname } from 'next/navigation'
import mtimes from '@/data/doc-mtimes.json'

// Emits per-doc JSON-LD that AI Overviews and Google Search use to
// decide whether a page is citable for a given query. Two schemas:
//
//   - TechArticle: tells the engine this is a technical doc page,
//     authored by GoFr, published at the current URL with the page
//     title as headline.
//   - BreadcrumbList: gives the search result a clean trail
//     (Docs › Advanced Guide › RBAC) so a click-through lands on the
//     right place.
//
// Why `'use client'` for SEO content: Next 14 static export pre-
// renders client components at build time, so the `<script>` ends up
// in the HTML payload that Google/Perplexity/Claude crawlers read.
// `usePathname()` resolves to the actual route during build, not at
// runtime in the user's browser.
const SITE_URL = 'https://gofr.dev'

function humanizeSegment(seg) {
  return seg
    .split('-')
    .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
    .join(' ')
}

function buildBreadcrumbs(pathname, title) {
  const segments = pathname.split('/').filter(Boolean)
  const items = [
    { name: 'Home', url: SITE_URL + '/' },
  ]

  let acc = ''
  segments.forEach((seg, idx) => {
    acc += '/' + seg
    const isLast = idx === segments.length - 1
    items.push({
      name: isLast && title ? title : humanizeSegment(seg),
      url: SITE_URL + acc,
    })
  })

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.url,
    })),
  }
}

export function DocStructuredData({ title, description, lastUpdated }) {
  const pathname = usePathname() || '/'
  const url = SITE_URL + pathname
  // Auto-populate dateModified from the per-route mtime map when the
  // caller didn't pass an explicit lastUpdated. This is the freshness
  // signal Google's December 2025 core update started rewarding —
  // missing dateModified meant every doc looked equally stale.
  const dateModified = lastUpdated || mtimes[pathname] || null

  const article = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: description || undefined,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'GoFr',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Organization',
      name: 'GoFr',
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GoFr',
      url: SITE_URL,
    },
    ...(dateModified && { dateModified }),
  }

  const breadcrumb = buildBreadcrumbs(pathname, title)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  )
}
