import React from 'react'
import Unlock from '@/images/goforgofr/Text/Unlock.png'
import Location from '@/images/goforgofr/icon/Location.svg'
import Links from '@/images/goforgofr/icon/Links.svg'
import Image from 'next/image'
import { Button } from '@/components/Button'
import GFGTrackCard from '@/components/goforgofr/GFGTrackCard'

const GfgTracks = () => {
  const tracks = [
    {
      icon: Location,
      title: 'Alchemy Arena',
      description: 'AI & Go Fr',
    },
    {
      icon: Location,
      title: 'Code Quest Chronicles',
      description: 'GoFr & Golang',
    },
    {
      icon: Location,
      title: 'Blockchain Odyssey',
      description: 'GoFr & Web3/Blockchain',
    },
  ]
  return (
    <div id={'Tracks'}>
      <div
        className={`relative mt-[120px] flex min-h-[500px] flex-col items-center justify-center px-10 lg:px-20`}
        style={{
          backgroundImage: `url("/goforgofr/TracksBg.webp")`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <div className={`flex w-full flex-col items-center justify-center`}>
          <span
            className={`text-base font-semibold text-red-500 sm:text-xl md:text-2xl`}
          >
            23-24 November , 2024
          </span>
          <Image
            src={Unlock}
            alt={'Tracks'}
            width={1080}
            height={1080}
            className={`w-[500px] bg-cover object-cover`}
          />
          <span className={`mt-5 flex gap-4 text-base font-semibold`}>
            <Image
              src={Location}
              alt={'Location'}
              width={40}
              height={40}
              className={`w-[20px]`}
            />
            ZopSmart , Bengaluru
          </span>
          <Button className={`mt-5 !px-10`}>View on map</Button>
        </div>
      </div>
      <div className={`hidden justify-center md:flex`}>
        <Image
          src={Links}
          alt={'Tracks'}
          width={1080}
          height={1080}
          className={`w-[500px] bg-cover object-cover`}
        />
      </div>

      <div className={`flex items-center justify-center`}>
        <div className={`relative flex flex-col gap-4 pl-8 md:flex-row`}>
          <span
            className={`absolute left-0 top-0 flex h-full w-full max-w-[4px] flex-1 rounded-md bg-sky-400 md:hidden`}
          ></span>
          <span className={`py-2 md:hidden`}></span>
          {tracks.map((track, i) => (
            <GFGTrackCard data={track} key={i} />
          ))}
          <span className={`py-2 md:hidden`}></span>
        </div>
      </div>
    </div>
  )
}

export default GfgTracks
