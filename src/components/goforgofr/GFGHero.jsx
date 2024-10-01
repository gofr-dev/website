import React from 'react'
import {Button} from "@/components/Button";

import GO_FOR_GOFr from '@/images/goforgofr/GO_FOR_GOFr.svg'
import Hackathon from '@/images/goforgofr/Hackathon.svg'
import HeroSvg from '@/images/goforgofr/HeroSvg.svg'
import Image from "next/image";
import Link from "next/link";
import {HeroBackground} from "@/components/HeroBackground";
import blurCyanImage from "@/images/blur-cyan.png";

const GfgHero = () => {
  const gradientText = {
    backgroundImage:
      'linear-gradient(180deg, rgba(32, 178, 236, 1) 0%, rgba(121, 144, 247, 1) 100%)',
    WebkitBackgroundClip: 'text', // For Safari
    backgroundClip: 'text',
    color: 'transparent',
  }

  return (
    <div className={`flex items-center justify-center md:py-20 px-10 md:px-14 md:pl-20 flex-col-reverse md:flex-row relative`}>
      <HeroBackground className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 lg:translate-y-[-60%] z-0 opacity-30" />
      <Image
          className="absolute top-[-100px] left-0 opacity-50 z-0"
          src={blurCyanImage}
          alt=""
          width={530}
          height={530}
          unoptimized
          priority
      />

        <Image
            className="absolute -right-2 -top-64 opacity-50 z-0"
            src={blurCyanImage}
            alt=""
            width={530}
            height={530}
            unoptimized
            priority
        />
      <div className={`flex w-full max-w-[300px] md:max-w-full md:w-1/2 justify-center flex-col`}>
        <div className={`flex flex-col gap-4 py-10 z-20`}>
          <div className={`text-6xl font-semibold`}>
            <Image src={GO_FOR_GOFr} alt={"Go for GoFr"} className={`max-w-[400px] w-full`} />
          </div>
          <div className={`text-6xl font-semibold`}>
            <Image src={Hackathon} alt={"Go for GoFr"} className={`max-w-[400px] w-full`} />
          </div>
          <div>
            <span className={`italic font-semibold`}>Innovate , Code, Create & Elevate</span>
          </div>
          <div className={`mt-6`}>
            <Link href={'https://docs.google.com/forms/d/e/1FAIpQLSeAlrrQNyCYgEhbBtN5X-y97YzEXpNVM7RLNdtAvhgYMiBysA/viewform'} target={'_blank'}>
              <Button className={` !px-8`}>Register Now</Button>
            </Link>
          </div>
        </div>
      </div>

      <div className={`flex w-full max-w-[300px] md:max-w-full md:w-1/2 items-center justify-end`}>
        <Image src={HeroSvg} alt={"Go for GoFr"} width={50} height={50} className={`z-10 w-full max-w-[500px] `} />
      </div>
    </div>
  )
}

export default GfgHero
