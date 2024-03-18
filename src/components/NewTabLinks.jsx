import Link from 'next/link'

export function NewTabLink({ href, title, newtab = true }) {
  return (
    <Link href={href} target={newtab ? '_blank' : '_self'}>
      {title}
    </Link>
  )
}
