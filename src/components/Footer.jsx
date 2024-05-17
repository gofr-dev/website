import React from 'react'
import Link from 'next/link'
import cloudNativeLandscapeSvg from '@/images/cloud-native-landscape.svg'
import awesomeGo from '@/images/awesome-go.svg'
import Image from 'next/image'
import { RedditIcon } from './icons/RedditIcon'
import { GithubIcon } from './icons/GithubIcon'
import { DiscordIcon } from './icons/DiscordIcon'
import { LinkedinIcon } from './icons/LinkedinIcon'
import { TwitterIcon } from './icons/TwitterIcon'

const SocailMediaLinks = [
  {
    Icon: GithubIcon,
    Link: 'https://github.com/gofr-dev/',
  },
  {
    Icon: DiscordIcon,
    Link: 'https://discord.com/invite/j3UAs74g',
  },
  {
    Icon: RedditIcon,
    Link: 'https://www.reddit.com/r/gofr/',
  },
  {
    Icon: LinkedinIcon,
    Link: 'https://in.linkedin.com/company/gofr-dev',
  },
  {
    Icon: TwitterIcon,
    Link: 'https://twitter.com/gofr_dev',
  },
]

function FooterUi() {
  return (
    <footer className="border-t border-slate-800 px-12 pb-4 pt-4 dark:bg-slate-900 ">
      {/* <div className="flex w-full flex-col">
        <div className="mb-4 flex flex-col items-baseline justify-between md:flex-row">
          <div className="flex-1">
            <h2 className="mb-5 text-base font-semibold capitalize text-gray-900 dark:text-white">
              Web Links
            </h2>
            <ul className="text-sm font-medium text-gray-500 dark:text-gray-400">
              <li>
                <a
                  href="https://landscape.cncf.io/?selected=go-fr"
                  className="flex h-12 w-28 hover:text-sky-200"
                  target="_blank"
                >
                  <div className="dark:bg-slate-900">
                    <Image
                      src={cloudNativeLandscapeSvg}
                      alt="cloudNativeLandscape"
                      className="h-full w-full"
                    />
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/avelino/awesome-go?tab=readme-ov-file#web-frameworks"
                  className="flex h-12 w-28 hover:text-sky-200"
                  target="_blank"
                >
                  <div className="dark:bg-slate-900">
                    <Image
                      src={awesomeGo}
                      alt="cloudNativeLandscape"
                      className="h-full w-full"
                    />
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h2 className="mb-5 text-base font-semibold capitalize text-gray-900 dark:text-white">
              Community
            </h2>
            <ul className="text-sm font-medium text-slate-700 dark:text-slate-400">
              <li className="mb-3">
                <a
                  href="https://github.com/gofr-dev/gofr/discussions"
                  target="_blank"
                  className="hover:text-slate-300"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-xs text-gray-500 dark:text-gray-300 sm:text-center">
            © 2023 <span>GoFr</span>. All Rights Reserved.
          </span>
        </div>
      </div> */}
      {/* <div className="flex items-center justify-center gap-4 overflow-auto"> */}
      <div class="mx-auto max-w-7xl flex-wrap px-6 py-6 md:flex md:items-center md:justify-center lg:px-8">
        <div class="flex items-center justify-center space-x-6 md:order-2 ">
          {SocailMediaLinks.map((item, idx) => {
            const { Icon, Link: link } = item
            return (
              <Link
                href={link}
                class="text-gray-400 hover:text-gray-500"
                target="_blank"
                aria-label="social media link"
              >
              <Icon className="h-7 w-7 fill-slate-400 transition-transform transition-colors duration-300 hover:fill-slate-500 dark:hover:fill-slate-500 hover:scale-125"></Icon>
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default FooterUi
