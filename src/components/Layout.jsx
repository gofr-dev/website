'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { MobileNavigation } from '@/components/MobileNavigation'
import { Search } from '@/components/Search'
import { HomePage } from './HomePage'
import { DocsPage } from './DocsPage'
import { formatNumber } from '@/lib/common'

function GitHubIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" {...props}>
      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z" />
    </svg>
  )
}

function Header() {
  let [isScrolled, setIsScrolled] = useState(false)
  let pathname = usePathname()
  const isCertificate = pathname.includes('certificate')
  const [githubStars, setGithubStars] = useState(1300)

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const response = await fetch(
          'https://api.github.com/repos/gofr-dev/gofr',
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        if (data?.watchers) setGithubStars(data?.watchers)
      } catch (error) {
        console.error('Error fetching the repo data:', error)
      }
    }
    fetchRepoData()
    function onScroll() {
      setIsScrolled(window.scrollY > 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <header
      className={clsx(
        'sticky top-0 z-50 flex flex-none flex-wrap items-center justify-between bg-white px-4 py-5 shadow-md shadow-slate-900/5 transition duration-500 dark:shadow-none sm:px-6 lg:px-8',
        isScrolled
          ? 'dark:bg-slate-900/95 dark:backdrop-blur dark:[@supports(backdrop-filter:blur(0))]:bg-slate-900/75'
          : 'dark:bg-transparent',
      )}
    >
      {!isCertificate && (
        <div className="mr-6 flex lg:hidden">
          <MobileNavigation />
        </div>
      )}
      <div className="relative flex flex-grow basis-0 items-center">
        <Link href="/" aria-label="Home page" className="flex items-center">
          <span className="text-3xl font-bold italic text-sky-400">
            Go{' '}
            <span className="not-italic text-slate-700 dark:text-white">
              Fr
            </span>
          </span>
        </Link>
      </div>
      {!isCertificate && (
        <div className="-my-5 mr-6 sm:mr-8 md:mr-0">
          <Search />
        </div>
      )}
      <div className="relative flex basis-0 items-center justify-end gap-2 sm:gap-2 md:flex-grow">
        <Link
          href="https://github.com/gofr-dev/gofr"
          className="group"
          target="_blank"
          aria-label="GitHub"
        >
          <div className="group relative rounded-xl border border-slate-200 dark:border-slate-800">
            <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-10 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
            <div className="relative flex items-center justify-center space-x-1 overflow-hidden rounded-xl px-2 py-1">
              <GitHubIcon className="mr-1 h-5 w-5 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300" />

              <span className=" text-sm font-semibold text-white">
                {formatNumber(githubStars)}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="#fcd34d"
                className="h-3.5 w-3.5 [--icon-background:theme(colors.white)] [--icon-foreground:theme(colors.slate.900)]"
              >
                <path
                  fillRule="evenodd"
                  d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </Link>
      </div>
    </header>
  )
}

export function Layout({ children }) {
  let pathname = usePathname()
  let isHomePage = pathname === '/'
  const isCertificate = pathname.includes('certificate')

  return (
    <div className="flex w-full flex-col">
      <Header />
      {isHomePage ? (
        <HomePage />
      ) : (
        <>{isCertificate ? children : <DocsPage>{children}</DocsPage>}</>
      )}
    </div>
  )
}
