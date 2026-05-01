'use client'

import Link from 'next/link'
import { RedditIcon } from './icons/RedditIcon'
import { GithubIcon } from './icons/GithubIcon'
import { DiscordIcon } from './icons/DiscordIcon'
import { LinkedinIcon } from './icons/LinkedinIcon'
import { TwitterIcon } from './icons/TwitterIcon'
import EmailIcon from './icons/EmailIcon'

// Grouped, center-aligned footer columns. Each column has 5 entries so
// the visual height is balanced; uneven columns made "Resources" tower
// over the others. "Framework" replaces "Product" — GoFr is open
// source, not a commercial product, so the OSS-appropriate noun is
// the framework itself.
const columns = [
  {
    title: 'Framework',
    links: [
      { title: 'Documentation', href: '/docs' },
      { title: 'Quick Start', href: '/docs/quick-start/introduction' },
      { title: 'Examples', href: '/examples' },
      { title: 'Changelog', href: '/changelog' },
      { title: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { title: 'Why GoFr', href: '/why-gofr' },
      { title: 'Compare', href: '/comparison' },
      { title: 'Migrate', href: '/migrate' },
      { title: 'Learn', href: '/learn' },
      { title: 'FAQ', href: '/faq' },
    ],
  },
  {
    title: 'Community',
    links: [
      { title: 'GitHub', href: 'https://github.com/gofr-dev/', external: true },
      { title: 'Discord', href: 'https://discord.gg/5ACeSKGt37', external: true },
      { title: 'Reddit', href: 'https://www.reddit.com/r/gofr/', external: true },
      { title: 'X (Twitter)', href: 'https://twitter.com/gofr_dev', external: true },
      { title: 'LinkedIn', href: 'https://in.linkedin.com/company/gofr-dev', external: true },
    ],
  },
  {
    title: 'Project',
    links: [
      { title: 'Team', href: '/team' },
      { title: 'Showcase', href: '/showcase' },
      { title: 'Events', href: '/events' },
      // /llms.txt rather than AGENTS.md here: the hero already hands
      // AGENTS.md to developers wiring Claude/Cursor. The footer is
      // where AI search-engine crawlers and curious humans look for
      // the broader curated link index, so we point them there.
      { title: 'LLM index', href: '/llms.txt', external: true },
      { title: 'Blog', href: 'https://medium.com/gofr', external: true },
    ],
  },
]

const socialMediaLinks = [
  { Icon: GithubIcon, href: 'https://github.com/gofr-dev/', label: 'GitHub' },
  { Icon: DiscordIcon, href: 'https://discord.gg/5ACeSKGt37', label: 'Discord' },
  { Icon: RedditIcon, href: 'https://www.reddit.com/r/gofr/', label: 'Reddit' },
  { Icon: LinkedinIcon, href: 'https://in.linkedin.com/company/gofr-dev', label: 'LinkedIn' },
  { Icon: TwitterIcon, href: 'https://twitter.com/gofr_dev', label: 'Twitter' },
  { Icon: EmailIcon, href: 'mailto:connect@gofr.dev', label: 'Email' },
]

function FooterUi() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 dark:bg-slate-900">
      {/* Top section: column grid, centered. */}
      <div className="mx-auto max-w-5xl px-6 pb-10 pt-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 text-center sm:grid-cols-4 sm:text-left">
          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="font-display text-sm font-semibold text-slate-900 dark:text-white">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => {
                  // External links (and static files like /AGENTS.md)
                  // need a plain <a>; next/link tries to client-side
                  // route to in-app paths, which silently fails for
                  // public/ static files.
                  const Wrapper = link.external ? 'a' : Link
                  return (
                    <li key={link.title}>
                      <Wrapper
                        href={link.href}
                        target={link.external ? '_blank' : undefined}
                        rel={link.external ? 'noopener noreferrer' : undefined}
                        className="text-sm text-slate-500 transition-colors hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                      >
                        {link.title}
                      </Wrapper>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Full-width divider — outside any max-w container so it spans */}
      {/* the entire page like the top edge does. */}
      <div className="border-t border-slate-200 dark:border-slate-800" />

      {/* Bottom section: social icons only, centered. Language switcher */}
      {/* and copyright/license line removed — visitors who want license */}
      {/* info can find it in the linked GitHub repos. */}
      <div className="mx-auto max-w-5xl px-6 pb-12 pt-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
          <div className="flex items-center gap-4">
            {socialMediaLinks.map(({ Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-slate-500 transition-colors hover:text-slate-700 dark:hover:text-slate-300"
              >
                <Icon className="h-4 w-4 fill-current" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterUi
