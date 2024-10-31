import React from 'react'
import Location from '@/images/goforgofr/icon/Location.svg'
import Links from '@/images/goforgofr/icon/Links.svg'
import Image from 'next/image'
import { Button } from '@/components/Button'
import GFGTrackCard from '@/components/goforgofr/GFGTrackCard'
import Link from 'next/link'

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
      >
        <img
          src={'/img/hackathon/TracksBg.webp'}
          alt={'Tracks'}
          className={`absolute left-0 z-0 h-full  w-[100vw] bg-cover object-cover`}
        />

        <div
          className={`z-10 flex w-full flex-col items-center justify-center`}
        >
          <span
            className={`text-base font-semibold text-red-500 sm:text-xl md:text-2xl`}
          >
            23-24 November , 2024
          </span>
          <h1 className='text-7xl text-center max-w-2xl font-extrabold bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-transparent'>UNLOCK THE TRACKS</h1>
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
          <Link
            href={`https://maps.app.goo.gl/N8GdxnioYtzBqVkc7`}
            target={'_blank'}
          >
            <Button className={`mt-5 !px-10`}>View on map</Button>
          </Link>
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
