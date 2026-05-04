'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatNumber } from '@/lib/common'
import companies from './companies.json'
import testimonials from '../../../utils/testimonials.json'

import company1 from '@/images/doceree.svg'
import company2 from '@/images/americanExpress.svg'
import company3 from '@/images/ibm.svg'
import company4 from '@/images/mydbops.svg'
import company5 from '@/images/guidewire.svg'
import company6 from '@/images/weave.svg'
import company8 from '@/images/blinkit.svg'
import company10 from '@/images/mcafee.svg'
import company11 from '@/images/walmart.svg'

const logoMap = {
  'American Express': company2,
  'IBM': company3,
  'McAfee': company10,
  'Blinkit': company8,
  'Walmart': company11,
  'Doceree': company1,
  'Mydbops': company4,
  'Guidewire': company5,
  'Weave': company6,
}

export default function ShowcasePage() {
  // Display the cached count if available; otherwise leave empty rather
  // than show a stale fallback ("3500+" was years out of date).
  const [githubStars, setGithubStars] = useState(null)

  useEffect(() => {
    let cached = localStorage.getItem('githubStars')
    if (cached) {
      setGithubStars(formatNumber(Number(cached)))
      return
    }
    // No cached value — fetch live so first-time visitors see a number.
    fetch('https://api.github.com/repos/gofr-dev/gofr')
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d?.watchers) {
          setGithubStars(formatNumber(d.watchers))
          try { localStorage.setItem('githubStars', String(d.watchers)) } catch {}
        }
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center">
          <h1 className="font-display text-4xl font-bold tracking-tight text-white">
            Used by engineers around the world
          </h1>
          {githubStars && (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#fcd34d" className="h-4 w-4">
                <path fillRule="evenodd" d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z" clipRule="evenodd" />
              </svg>
              {githubStars} stars on GitHub
            </div>
          )}
        </div>

        {/* Company Grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {companies.map((company) => (
            <div
              key={company.name}
              className="group relative flex flex-col items-center rounded-xl border border-slate-800 p-6 transition-all hover:border-transparent"
            >
              <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 transition-opacity [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
              <div className="relative">
                {logoMap[company.name] && (
                  <Image
                    src={logoMap[company.name]}
                    alt={company.name}
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                  />
                )}
                <p className="mt-3 text-center text-xs text-slate-500">{company.industry}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="mt-20">
          <h2 className="text-center font-display text-2xl font-bold text-white">
            What Engineers Say
          </h2>
          <div className="mt-8 grid gap-6 md:columns-2 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="rounded-xl border border-slate-800 p-6"
              >
                <p className="text-sm leading-relaxed text-slate-400">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-4 flex items-center gap-3">
                  {t.profile && (
                    <Image
                      src={t.profile}
                      alt={t.author}
                      width={36}
                      height={36}
                      className="rounded-full"
                      unoptimized
                    />
                  )}
                  <div>
                    <p className="text-sm font-medium text-white">{t.author}</p>
                    <p className="text-xs text-slate-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA — asking for a testimonial rather than a company logo */}
        {/* keeps the credibility signal individual-developer-shaped */}
        {/* (which matches who actually adopts GoFr) instead of pushing */}
        {/* contributors to get corporate sign-off they may not have. */}
        <div className="mt-16 text-center">
          <p className="text-slate-400">Using GoFr in production?</p>
          <Link
            href="https://github.com/gofr-dev/gofr/issues/new?title=Testimonial:+How+I+use+GoFr&body=Name:+%0ARole+/+team:+%0AHow+we+use+GoFr:+%0AHappy+to+be+quoted+publicly:+yes/no"
            target="_blank"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-sky-400 hover:text-sky-300"
          >
            Share a testimonial
            <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none">
              <path d="M3.5 3.5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M8.5 3.5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
