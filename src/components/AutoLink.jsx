import Link from 'next/link'

// Determine whether an href points to an external site.
// - Relative paths and pure hashes are internal.
// - mailto: / tel: are treated as internal (handler-driven, no new tab).
// - Anything else is parsed as an absolute URL; gofr.dev and any
//   subdomain of gofr.dev (staging.gofr.dev, console.gofr.dev, etc.)
//   are considered internal. www. variants are normalized.
const INTERNAL_HOST = 'gofr.dev'

function isExternal(href) {
  if (!href) return false
  if (href.startsWith('/') || href.startsWith('#')) return false
  if (href.startsWith('mailto:') || href.startsWith('tel:')) return false
  try {
    const url = new URL(href, 'https://gofr.dev')
    const host = url.host.replace(/^www\./, '')
    return host !== INTERNAL_HOST && !host.endsWith('.' + INTERNAL_HOST)
  } catch {
    return false
  }
}

export function AutoLink({ href, children, ...rest }) {
  if (isExternal(href)) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    )
  }
  return (
    <Link href={href || '#'} {...rest}>
      {children}
    </Link>
  )
}
