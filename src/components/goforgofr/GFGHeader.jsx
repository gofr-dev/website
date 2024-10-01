"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { GitHubIcon } from '@/components/Layout'
import { formatNumber } from '@/lib/common'

const GfgHeader = () => {
  const [githubStars, setGithubStars] = useState(null)

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
  }, [])

  return (
    <div className={`flex w-full items-center justify-between p-4 z-10`}>
      <div className={`flex items-center gap-4`}>
        <a
          aria-label="Home page"
          className="flex items-center gap-2 text-3xl font-bold"
          href="/"
        >
          <span className="italic text-sky-400">Go</span>
          <span className="not-italic text-white">Fr</span>
        </a>

        <div
          className={`ml-16 hidden items-center gap-4 font-semibold md:flex md:gap-16 text-gray-400`}
        >
          <a className={`hover:text-white transition-all`} href={'#Tracks'}>Tracks</a>
          <a className={`hover:text-white transition-all`} href={'#Schedule'}>Schedule</a>
          <a className={`hover:text-white transition-all`} href={'#Prizes'}>Prizes</a>
          <a className={`hover:text-white transition-all`} href={'#Faq'}>Faq</a>
        </div>
      </div>

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

            {githubStars && (
              <div className="animate-fadeIn flex items-center gap-1">
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
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default GfgHeader
