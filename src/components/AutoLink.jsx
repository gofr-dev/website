import Link from 'next/link'

// Allowed protocol schemes for outbound links. Anything outside this list
// (e.g. `javascript:`, `data:`, `vbscript:`, `file:`) is dropped to a plain
// non-clickable span — these schemes are XSS vectors when reflected from
// markdown content.
const SAFE_SCHEMES = ['http:', 'https:', 'mailto:', 'tel:']

// Internal host(s). gofr.dev plus any subdomain (staging.gofr.dev,
// console.gofr.dev, …) is treated as internal so cross-property links
// stay in the same tab.
const INTERNAL_HOST = 'gofr.dev'

function classify(href) {
  if (!href) return 'empty'
  if (href.startsWith('#')) return 'anchor'
  if (href.startsWith('/')) return 'internal'
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return 'handler'
  // For absolute URLs, parse to determine scheme + internal-vs-external.
  let url
  try {
    url = new URL(href)
  } catch {
    // Not parseable as absolute — treat as internal relative URL.
    return 'internal'
  }
  if (!SAFE_SCHEMES.includes(url.protocol)) return 'unsafe'
  if (url.protocol === 'mailto:' || url.protocol === 'tel:') return 'handler'
  const host = url.host.replace(/^www\./, '')
  if (host === INTERNAL_HOST || host.endsWith('.' + INTERNAL_HOST)) {
    return 'internal'
  }
  return 'external'
}

export function AutoLink({ href, children, ...rest }) {
  const kind = classify(href)

  // Unsafe scheme (javascript:, data:, …) — render as inert text so the
  // markdown author sees their content but no clickable XSS surface ships.
  if (kind === 'unsafe' || kind === 'empty') {
    return <span {...rest}>{children}</span>
  }

  // External — open in a new tab.
  if (kind === 'external') {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  }

  // Anchor / mailto / tel — plain <a>. Next.js Link is for in-app routing
  // and doesn't behave correctly for hash-only or protocol-handler hrefs.
  if (kind === 'anchor' || kind === 'handler') {
    return (
      <a href={href} {...rest}>
        {children}
      </a>
    )
  }

  // Internal Next.js route — use <Link> for client-side navigation + prefetch.
  return (
    <Link href={href} {...rest}>
      {children}
    </Link>
  )
}
