'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export function PkgRedirect({ name, docsPath }) {
  useEffect(() => {
    if (docsPath) {
      const timer = setTimeout(() => {
        window.location.href = docsPath
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [docsPath])

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-sm font-medium text-sky-500">Go Package</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-slate-900 dark:text-white">
          {name}
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400">
          This page exists for Go module import resolution.
        </p>
        {docsPath ? (
          <Link
            href={docsPath}
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sky-500 hover:text-sky-600"
          >
            View documentation
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z" clipRule="evenodd" />
            </svg>
          </Link>
        ) : (
          <Link
            href="/docs/datasources/getting-started"
            className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-sky-500 hover:text-sky-600"
          >
            View datasource documentation
            <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
              <path fillRule="evenodd" d="M2 8a.75.75 0 01.75-.75h8.69L8.22 4.03a.75.75 0 011.06-1.06l4.5 4.5a.75.75 0 010 1.06l-4.5 4.5a.75.75 0 01-1.06-1.06l3.22-3.22H2.75A.75.75 0 012 8z" clipRule="evenodd" />
            </svg>
          </Link>
        )}
      </div>
    </div>
  )
}
