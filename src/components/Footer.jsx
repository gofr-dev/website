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
import EmailIcon from './icons/EmailIcon'


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
    {
    Icon: EmailIcon,
    Link: 'mailto:connect@gofr.dev',
  },
]

const footerLinks = [
  // { title: 'Releases', link: '/releases' },
  { title: 'Documentation', link: '/docs' },
  { title: 'Blogs', link: 'https://medium.com/gofr', target_blank: true },
  { title: 'Events', link: '/events' },
]

function FooterUi() {
  return (
    <footer className="border-t border-slate-800 px-4 py-2 dark:bg-slate-900">
      <div className="mx-auto max-w-screen-2xl px-2 py-2 ">
        <nav
          aria-label="Footer"
          className="relative z-10 flex justify-center gap-5 sm:space-x-12"
        >
          {footerLinks.map((item) => (
            <div key={item.title} className="pb-2">
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
        <div className="mt-4 flex justify-center space-x-6">
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
                <Icon className="h-5 w-5 fill-slate-400 hover:fill-slate-300 dark:hover:fill-slate-300"></Icon>
              </Link>
            )
          })}
        </div>
      </div>
    </footer>
  )
}

export default FooterUi
