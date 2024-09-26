import React from 'react'
import Unlock from '@/images/goforgofr/Text/Unlock.png'
import Location from '@/images/goforgofr/icon/Location.svg'
import Links from '@/images/goforgofr/icon/Links.svg'
import Image from 'next/image'
import { Button } from '@/components/Button'
import GFGTrackCard from "@/components/goforgofr/GFGTrackCard";

const GfgTracks = () => {
    const tracks = [
        {
            icon : Location,
            title : 'Alchemy Arena',
            description : 'AI & Go Fr',
        },
        {
            icon : Location,
            title : 'Code Quest Chronicles',
            description : 'GoFr & Golang',
        },
        {
            icon : Location,
            title : 'Blockchain Odyssey',
            description : 'GoFr & Web3/Blockchain',
        }
    ]
  return (
      <div>
          <div
              className={`relative mt-[120px] flex min-h-[500px] flex-col items-center justify-center`}
              style={{
                  backgroundImage: `url("/goforgofr/TracksBg.svg")`,
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
              }}
          >
              <div className={`flex w-full flex-col items-center justify-center`}>
          <span className={`text-2xl font-semibold text-red-500`}>
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
          <div className={`flex justify-center`}>
              <Image
                  src={Links}
                  alt={'Tracks'}
                  width={1080}
                  height={1080}
                  className={`w-[500px] bg-cover object-cover`}
              />
          </div>

          <div className={`flex justify-center gap-4`}>
              {
                  tracks.map((track, i) => (
                      <GFGTrackCard data={track} key={i} />
                  ))
              }
          </div>
      </div>
  )
}

export default GfgTracks
