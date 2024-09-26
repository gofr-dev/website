import React from 'react'
import GFGSponsorCard from '@/components/goforgofr/GFGSponsorCard'
import OUR from '@/images/goforgofr/OUR.png'
import Image from "next/image";

const GfgSponsor = () => {
  return (
    <div className={`mt-10 flex flex-col px-20`} id={`sponsors_section`}>
      <div className={`flex flex-col gap-4`}>
        <div className={`flex flex-col`}>
          <Image width={'400'} height={100} src={OUR} className={`h-[100px] object-contain w-fit`}  alt={"OUR"}/>
          <span
            className={`text-[66px] font-semibold tracking-wide text-sky-400`}
            style={{ fontFamily: 'Impact, sans-serif' }}
          >
            SPONSORS
          </span>
        </div>
        <div className={`flex min-h-[300px] w-full gap-10 flex-wrap justify-center`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <GFGSponsorCard
              key={i}
              name={'NAME ' + i}
              subName={'SUB_NAME ' + i}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GfgSponsor
