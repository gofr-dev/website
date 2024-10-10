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

const socialMediaLinks = [
  {
    Icon: GithubIcon,
    Link: 'https://github.com/gofr-dev/',
  },
  {
    Icon: DiscordIcon,
    Link: 'https://discord.gg/5ACeSKGt37',
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

const footerLinks = [
  // { title: 'Releases', link: '/releases' },
  { title: 'Documentation', link: '/docs' },
  { title: 'Blogs', link: 'https://medium.com/gofr', target_blank: true },
]

function FooterUi() {
  return (
    <footer className="border-t border-slate-800 px-12 pb-4 pt-4 dark:bg-slate-900">
      <div className="mx-auto max-w-screen-2xl overflow-hidden px-6 py-4 lg:px-8">
        <nav
          aria-label="Footer"
          className="-mb-6 flex flex-wrap justify-center gap-5"
        >
          {footerLinks.map((item) => (
            <div key={item.title} className="pb-6">
              <Link
                href={item.link}
                target={item?.target_blank ? '_blank' : '_self'}
                className="text-sm leading-6 text-slate-400 hover:text-slate-300"
              >
                {item.title}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-8 flex flex-wrap gap-5 justify-center">
          {socialMediaLinks.map((item, idx) => {
            const { Icon, Link: link } = item
            return (
              <Link
                key={link}
                href={link}
                className="text-gray-400 hover:text-gray-500"
                target="_blank"
                aria-label="social media link"
              >
                <Icon className="h-6 w-6 fill-slate-400 hover:fill-slate-300 dark:hover:fill-slate-300"></Icon>
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default FooterUi
