import React from 'react'
import { Button } from '@/components/Button'

import HeroSvg from '@/images/goforgofr/HeroSvg.svg'
import Image from 'next/image'
import Link from 'next/link'
import { HeroBackground } from '@/components/HeroBackground'

const GfgHero = () => {
  const gradientText = {
    backgroundImage:
      'linear-gradient(180deg, rgba(32, 178, 236, 1) 0%, rgba(121, 144, 247, 1) 100%)',
    WebkitBackgroundClip: 'text', // For Safari
    backgroundClip: 'text',
    color: 'transparent',
  }

  return (
    <div
      className={`relative flex flex-col-reverse items-center justify-center px-10 md:flex-row md:px-14 md:py-20 md:pl-20`}
    >
      <HeroBackground className="absolute right-0 top-1/2 z-0 -translate-y-1/2 translate-x-1/2 opacity-30 lg:translate-y-[-60%]" />
      <img
        className="absolute left-0 top-[-100px] z-0 opacity-50"
        src={'/img/hackathon/blur-cyan-min.png'}
        alt=""
        width={530}
        height={530}
      />

      <img
        className="absolute -right-2 -top-64 z-0 opacity-50"
        src={'/img/hackathon/blur-cyan-min.png'}
        alt=""
        width={530}
        height={530}
      />
      <div
        className={`flex w-full max-w-[300px] flex-col justify-center md:w-1/2 md:max-w-full`}
      >
        <div className={`z-20 flex flex-col gap-4 py-10`}>
          <div className={`text-6xl font-semibold`}>
            <span className="flex flex-wrap items-baseline space-x-3 bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-transparent ">
              <h1 className="text-5xl md:text-6xl lg:text-8xl">Go</h1>
              <h1 className="text-2xl md:text-3xl lg:text-4xl">For</h1>
              <h1 className="text-5xl md:text-6xl lg:text-8xl">GoFr</h1>
            </span>
          </div>
          <div className={`text-6xl font-semibold`}>
            <h1 className="bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-transparent text-3xl sm:text-4xl md:text-5xl lg:text-7xl">
              HACKATHON
            </h1>
          </div>
          <div>
            <span>
              Innovate , Code, Create & Elevate
            </span>
          </div>
          <div className={`mt-6`}>
            <Link
              href={
                'https://docs.google.com/forms/d/e/1FAIpQLSeAlrrQNyCYgEhbBtN5X-y97YzEXpNVM7RLNdtAvhgYMiBysA/viewform'
              }
              target={'_blank'}
            >
              <Button className={` !px-8`}>Register Now</Button>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`flex w-full max-w-[300px] items-center justify-end md:w-1/2 md:max-w-full`}
      >
        <Image
          src={HeroSvg}
          alt={'Go for GoFr'}
          width={50}
          height={50}
          className={`z-10 w-full max-w-[500px] `}
        />
      </div>
    </div>
  )
}

export default GfgHero
