'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { navigation } from '@/lib/navigation'

export function Navigation({ className, onLinkClick }) {
  let pathname = usePathname()

  // Track which sections are expanded
  let [expanded, setExpanded] = useState(() => {
    let defaults = {}
    for (let section of navigation) {
      // Expand Quick Start by default
      if (section.title.toLowerCase().includes('quick start')) {
        defaults[section.title] = true
      }
    }
    return defaults
  })

  // Auto-expand section containing active page
  useEffect(() => {
    let active = navigation.find((s) => s.links.find((l) => l.href === pathname))
    if (active) {
      setExpanded((prev) => ({ ...prev, [active.title]: true }))
    }
  }, [pathname])

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-8">
        {navigation.map((section) => {
          let isOpen = expanded[section.title] ?? false

          return (
            <li key={section.title}>
              <button
                onClick={() => setExpanded((p) => ({ ...p, [section.title]: !p[section.title] }))}
                className="flex w-full items-center justify-between text-left"
              >
                <h2 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                  {section.title}
                </h2>
                <svg
                  className={clsx(
                    'h-3 w-3 flex-none text-slate-400 transition-transform duration-150',
                    isOpen && 'rotate-90',
                  )}
                  viewBox="0 0 16 16" fill="none"
                >
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isOpen && (
                <ul
                  role="list"
                  className="mt-3 border-l border-slate-200 dark:border-slate-800"
                >
                  {section.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={onLinkClick}
                        className={clsx(
                          '-ml-px block border-l py-1.5 pl-4 text-sm',
                          link.href === pathname
                            ? 'border-sky-500 font-semibold text-sky-500'
                            : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700 dark:text-slate-400 dark:hover:border-slate-600 dark:hover:text-slate-300',
                        )}
                      >
                        {link.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
