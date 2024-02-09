import Link from 'next/link'

export function NewTabLink({ href, title }) {
  return (
    <Link href={href} target="_blank">
      {title}
    </Link>
  )
}
