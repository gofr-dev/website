import React from 'react'
import Link from 'next/link'

export const metadata = {
  title: 'GoFr CLI — Project Scaffolding for the Go Framework',
  description:
    'GoFr CLI is the command-line tool for initializing GoFr projects, generating boilerplate, and running framework-aware tasks for Go microservices.',
  alternates: {
    canonical: '/cli/gofr',
  },
}

const Page = () => {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
        GoFr CLI
      </h1>
      <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
        The command-line tool for initializing projects and performing tasks with the GoFr framework.
      </p>

      <div className="mt-8 rounded-2xl bg-slate-900 p-6 shadow-lg ring-1 ring-white/10">
        <p className="text-sm font-medium text-slate-400">Installation</p>
        <code className="mt-2 block text-sm text-sky-300">
          go install gofr.dev/cli/gofr@latest
        </code>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link
          href="/docs/references/gofrcli"
          className="group relative block rounded-xl border border-slate-200 p-5 transition-all hover:border-transparent dark:border-slate-800"
        >
          <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 transition-opacity [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
          <div className="relative">
            <h3 className="font-display text-base font-medium text-slate-900 dark:text-white">
              CLI Documentation
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Full reference for all CLI commands and options.
            </p>
          </div>
        </Link>
        <Link
          href="https://github.com/gofr-dev/gofr-cli"
          target="_blank"
          className="group relative block rounded-xl border border-slate-200 p-5 transition-all hover:border-transparent dark:border-slate-800"
        >
          <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 transition-opacity [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
          <div className="relative">
            <h3 className="font-display text-base font-medium text-slate-900 dark:text-white">
              GitHub Repository
            </h3>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Source code, issues, and contributions.
            </p>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Page
