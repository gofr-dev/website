import React from 'react'

import Prizes from '@/images/goforgofr/Text/PRIZES.svg'
import Image from 'next/image'

const GfgPrizes = () => {
  return (
    <div className={`my-20 flex flex-col gap-10 px-10 md:px-20`} id={'Prizes'}>
      <div>
        <Image src={Prizes} alt={'Prizes'} width={200} height={100} />
      </div>
      <div className={`text-slate-400`}>
          Win big with cash prizes, cool gadgets, exclusive goodies, premium developer tool subscriptions, vouchers, and non-stop fun!
      </div>
      <div
        className={`flex flex-col items-center justify-center gap-4 sm:flex-row sm:items-stretch`}
      >
        <div className={`flex w-full justify-end sm:w-1/2`}>
          <img
            src={'/img/hackathon/Prize1.webp'}
            alt={'Prize1'}
            className={`w-full max-w-[800px] flex-1 rounded-2xl object-cover`}
            loading={'eager'}
          />
        </div>
        <div className={`flex w-full flex-col gap-4 sm:w-1/2`}>
          <img
            src={'/img/hackathon/Prize2.webp'}
            alt={'Prize1'}
            className={`w-full max-w-[800px] rounded-2xl`}
            loading={'eager'}
          />
          <img
            src={'/img/hackathon/Prize3.webp'}
            alt={'Prize1'}
            className={`w-full max-w-[800px] rounded-2xl`}
            loading={'eager'}
          />
          <img
            src={'/img/hackathon/Prize4.webp'}
            alt={'Prize1'}
            className={`w-full max-w-[800px] rounded-2xl`}
          />
        </div>
      </div>
    </div>
  )
}

export default GfgPrizes
