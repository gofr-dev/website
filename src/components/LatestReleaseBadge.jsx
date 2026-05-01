'use client'

import Link from 'next/link'
import releases from '@/app/changelog/releases.json'

// Tiny inline release indicator. Reads the latest tagged release at
// build time from releases.json and renders a subtle one-line link.
// Placed under the Hero CTAs so visitors see "what's the latest" right
// next to the Get Started button — without taking up a whole strip
// across the top of the page.
function relativeTime(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  const diffMs = Date.now() - d.getTime()
  const days = Math.floor(diffMs / 86_400_000)
  if (days < 1) return 'today'
  if (days < 2) return 'yesterday'
  if (days < 30) return `${days} days ago`
  const months = Math.floor(days / 30)
  if (months < 12) return `${months} month${months > 1 ? 's' : ''} ago`
  const years = Math.floor(days / 365)
  return `${years} year${years > 1 ? 's' : ''} ago`
}

export function LatestReleaseBadge({ alignClassName = '' }) {
  const latest = Array.isArray(releases) && releases[0] ? releases[0] : null
  if (!latest?.tag) return null

  return (
    <div
      className={`flex flex-wrap items-center gap-x-1.5 text-xs text-slate-500 ${alignClassName}`}
    >
      <span>Latest release:</span>
      <Link
        href={`/changelog#${latest.tag}`}
        className="font-mono text-slate-400 transition-colors hover:text-sky-300"
      >
        {latest.tag}
      </Link>
      <span className="text-slate-700">·</span>
      <span>{relativeTime(latest.date)}</span>
    </div>
  )
}
