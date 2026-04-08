'use client'

import Link from 'next/link'
import { navigation } from '@/lib/navigation'

const sectionIcons = {
  'quick start': (
    <svg className="h-6 w-6 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  advanced: (
    <svg className="h-6 w-6 text-violet-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  datasource: (
    <svg className="h-6 w-6 text-sky-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" stroke="currentColor" fill="none" strokeWidth="1.5" />
    </svg>
  ),
  reference: (
    <svg className="h-6 w-6 text-amber-500" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" stroke="currentColor" fill="none" strokeWidth="1.5" />
    </svg>
  ),
}

function getIcon(title) {
  let lower = title.toLowerCase()
  for (let [key, icon] of Object.entries(sectionIcons)) {
    if (lower.includes(key)) return icon
  }
  return sectionIcons.reference
}

export function SectionCards() {
  return (
    <div className="not-prose my-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {navigation.map((section) => (
        <Link
          key={section.title}
          href={section.links[0]?.href || '/docs'}
          className="group relative block rounded-xl border border-slate-200 p-5 transition-all hover:border-transparent dark:border-slate-800 dark:hover:border-transparent"
        >
          <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 transition-opacity [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
          <div className="relative">
            <div className="flex items-center gap-3">
              {getIcon(section.title)}
              <h3 className="font-display text-base font-medium text-slate-900 dark:text-white">
                {section.title}
              </h3>
              <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                {section.links.length} guides
              </span>
            </div>
            {section.desc && (
              <p className="mt-2 text-sm text-slate-600 line-clamp-2 dark:text-slate-400">
                {section.desc}
              </p>
            )}
            <span className="mt-3 flex items-center gap-1 text-sm font-medium text-sky-500 group-hover:text-sky-600 dark:group-hover:text-sky-400">
              Explore
              <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="currentColor">
                <path fillRule="evenodd" d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z" clipRule="evenodd" />
              </svg>
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
