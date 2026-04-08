'use client'

import Link from 'next/link'

const channels = [
  {
    name: 'Discord',
    description: 'Real-time chat with the GoFr community and maintainers. Get help, share projects, and discuss ideas.',
    href: 'https://discord.gg/5ACeSKGt37',
    color: 'text-indigo-400',
    bgColor: 'bg-indigo-500/10',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    description: 'Star the repo, report issues, submit PRs, and browse the source code.',
    href: 'https://github.com/gofr-dev/gofr',
    color: 'text-slate-300',
    bgColor: 'bg-slate-500/10',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'Reddit',
    description: 'Join r/gofr for discussions, questions, and community posts about GoFr.',
    href: 'https://www.reddit.com/r/gofr/',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
      </svg>
    ),
  },
  {
    name: 'Twitter / X',
    description: 'Follow @gofr_dev for release announcements, tips, and framework updates.',
    href: 'https://twitter.com/gofr_dev',
    color: 'text-sky-400',
    bgColor: 'bg-sky-500/10',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    description: 'Connect with GoFr professionally. Company updates and engineering posts.',
    href: 'https://in.linkedin.com/company/gofr-dev',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    icon: (
      <svg className="h-8 w-8" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white">
            Community
          </h1>
          <p className="mt-3 text-lg text-slate-400">
            Join thousands of developers building with GoFr. Get help, share ideas, and contribute.
          </p>
        </div>

        {/* Channel Cards */}
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <Link
              key={channel.name}
              href={channel.href}
              target="_blank"
              className="group relative block rounded-xl border border-slate-800 p-6 transition-all hover:border-transparent"
            >
              <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 transition-opacity [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
              <div className="relative">
                <div className={`inline-flex rounded-lg p-2 ${channel.bgColor}`}>
                  <div className={channel.color}>{channel.icon}</div>
                </div>
                <h3 className="mt-4 font-display text-base font-medium text-white">
                  {channel.name}
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  {channel.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Contributing */}
        <div className="mt-16 rounded-2xl border border-slate-800 p-8">
          <h2 className="font-display text-2xl font-bold text-white">
            Contribute to GoFr
          </h2>
          <p className="mt-2 text-slate-400">
            GoFr is open source under the Apache 2.0 license. We welcome contributions of all kinds.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <Link
              href="https://github.com/gofr-dev/gofr/blob/main/CONTRIBUTING.md"
              target="_blank"
              className="rounded-lg border border-slate-700 p-4 text-center transition-colors hover:border-sky-500/50 hover:bg-slate-800/50"
            >
              <p className="text-sm font-medium text-white">Contributing Guide</p>
              <p className="mt-1 text-xs text-slate-500">How to get started</p>
            </Link>
            <Link
              href="https://github.com/gofr-dev/gofr/issues?q=is%3Aissue+is%3Aopen+label%3A%22good+first+issue%22"
              target="_blank"
              className="rounded-lg border border-slate-700 p-4 text-center transition-colors hover:border-emerald-500/50 hover:bg-slate-800/50"
            >
              <p className="text-sm font-medium text-white">Good First Issues</p>
              <p className="mt-1 text-xs text-slate-500">Pick up a starter task</p>
            </Link>
            <Link
              href="https://github.com/gofr-dev/gofr/issues"
              target="_blank"
              className="rounded-lg border border-slate-700 p-4 text-center transition-colors hover:border-amber-500/50 hover:bg-slate-800/50"
            >
              <p className="text-sm font-medium text-white">Report an Issue</p>
              <p className="mt-1 text-xs text-slate-500">Found a bug? Let us know</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
