import React from 'react'

import Prizes from '@/images/goforgofr/Text/PRIZES.svg'
import Prize1 from '@/images/goforgofr/Prize1.webp'
import Prize2 from '@/images/goforgofr/Prize2.webp'
import Prize3 from '@/images/goforgofr/Prize3.webp'
import Prize4 from '@/images/goforgofr/Prize4.webp'
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
          <Image
            src={Prize1}
            alt={'Prize1'}
            width={1080}
            height={1080}
            className={`w-full max-w-[800px] flex-1 rounded-2xl object-cover`}
          />
        </div>
        <div className={`flex w-full flex-col gap-4 sm:w-1/2`}>
          <Image
            src={Prize2}
            alt={'Prize1'}
            width={1080}
            height={1080}
            className={`w-full max-w-[800px] rounded-2xl`}
          />
          <Image
            src={Prize3}
            alt={'Prize1'}
            width={1080}
            height={1080}
            className={`w-full max-w-[800px] rounded-2xl`}
          />
          <Image
            src={Prize4}
            alt={'Prize1'}
            width={1080}
            height={1080}
            className={`w-full max-w-[800px] rounded-2xl`}
          />
        </div>
      </div>
    </div>
  )
}

export default GfgPrizes
