import React from 'react'
import {Button} from "@/components/Button";

import GO_FOR_GOFr from '@/images/goforgofr/GO_FOR_GOFr.svg'
import Hackathon from '@/images/goforgofr/Hackathon.svg'
import HeroSvg from '@/images/goforgofr/HeroSvg.svg'
import Image from "next/image";

const GfgHero = () => {
  const gradientText = {
    backgroundImage:
      'linear-gradient(180deg, rgba(32, 178, 236, 1) 0%, rgba(121, 144, 247, 1) 100%)',
    WebkitBackgroundClip: 'text', // For Safari
    backgroundClip: 'text',
    color: 'transparent',
  }

  return (
    <div className={`flex items-center justify-center md:my-20 px-10 md:px-14 md:pl-20 flex-col-reverse md:flex-row`}>
      <div className={`flex w-full max-w-[300px] md:max-w-full md:w-1/2 justify-center flex-col`}>
        <div className={`flex flex-col gap-4 py-10`}>
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
            <Button className={` !px-8`}>Register Now</Button>
          </div>
        </div>
      </div>

      <div className={`flex w-full max-w-[300px] md:max-w-full md:w-1/2 items-center justify-end`}>
        <Image src={HeroSvg} alt={"Go for GoFr"} width={50} height={50} className={`w-full max-w-[500px] `} />
      </div>
    </div>
  )
}

export default GfgHero
