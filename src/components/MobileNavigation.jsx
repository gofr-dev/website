'use client'

import { Suspense, useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Dialog } from '@headlessui/react'

import { Logomark } from '@/components/Logo'
import { Navigation } from '@/components/Navigation'

function MenuIcon(props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon(props) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <path d="M5 5l14 14M19 5l-14 14" />
    </svg>
  )
}

function CloseOnNavigation({ close }) {
  let pathname = usePathname()
  let searchParams = useSearchParams()

  useEffect(() => {
    close()
  }, [pathname, searchParams, close])

  return null
}

const siteLinks = [
  { title: 'Docs', href: '/docs' },
  { title: 'Changelog', href: '/changelog' },
  { title: 'Examples', href: '/examples' },
  { title: 'Showcase', href: '/showcase' },
  { title: 'Blog', href: 'https://medium.com/gofr', external: true },
]

export function MobileNavigation() {
  let [isOpen, setIsOpen] = useState(false)
  let close = useCallback(() => setIsOpen(false), [setIsOpen])

  function onLinkClick(event) {
    let link = event.currentTarget
    if (
      link.pathname + link.search + link.hash ===
      window.location.pathname + window.location.search + window.location.hash
    ) {
      close()
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="relative"
        aria-label="Open navigation"
      >
        <MenuIcon className="h-6 w-6 stroke-slate-500" />
      </button>
      <Suspense fallback={null}>
        <CloseOnNavigation close={close} />
      </Suspense>
      <Dialog
        open={isOpen}
        onClose={() => close()}
        className="fixed inset-0 z-50 flex items-start overflow-y-auto bg-slate-900/50 pr-10 backdrop-blur lg:hidden"
        aria-label="Navigation"
      >
        <Dialog.Panel className="min-h-full w-full max-w-[85vw] sm:max-w-xs bg-white px-4 pb-12 pt-5 dark:bg-slate-900 sm:px-6">
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => close()}
              aria-label="Close navigation"
            >
              <CloseIcon className="h-6 w-6 stroke-slate-500" />
            </button>
            <Link href="/" className="ml-6" aria-label="Home page">
              <Logomark className="h-9 w-9" />
            </Link>
          </div>
          <nav className="mt-5 border-b border-slate-200 pb-4 dark:border-slate-800">
            <ul className="space-y-2">
              {siteLinks.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    onClick={onLinkClick}
                    className="flex items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    {link.title}
                    {link.external && (
                      <svg className="ml-1 h-3 w-3 opacity-50" fill="none" viewBox="0 0 12 12">
                        <path d="M3.5 3.5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M8.5 3.5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Navigation className="mt-5 px-1" onLinkClick={onLinkClick} />
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
