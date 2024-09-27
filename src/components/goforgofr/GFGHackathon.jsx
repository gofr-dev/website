import React from 'react'

import Time from '@/images/goforgofr/Text/24hrs.svg'
import HACKATHON from '@/images/goforgofr/Text/HACKATHON.svg'
import Tick from '@/images/goforgofr/icon/Tick.svg'

import Image from 'next/image'

const GFGHackathon = () => {
  const gradientText = {
    backgroundImage:
      'linear-gradient(180deg, rgba(32, 178, 236, 1) 0%, rgba(121, 144, 247, 1) 100%)',
    WebkitBackgroundClip: 'text', // For Safari
    backgroundClip: 'text',
    color: 'transparent',
  }

  return (
    <div className={`flex flex-col px-10 pt-20 md:px-20`}>
      <div className={`flex flex-col gap-4`}>
        <Image src={Time} alt={'Time'} width={200} height={100} />
        <Image src={HACKATHON} alt={'Time'} width={400} height={100} />
      </div>

      <div className={`flex w-full flex-col items-center justify-center pt-20`}>
        <div className={`flex  flex-col lg:flex-row`}>
          <div
            className={`mb-10 flex w-full items-center lg:w-1/2 lg:justify-end`}
          >
            <div className="relative h-12 w-36 md:h-20 md:w-52">
              <div
                className="absolute inset-0 rounded-md"
                style={{
                  background:
                    'linear-gradient(136deg, rgba(56,189,248,1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.0) 60%, rgba(56,189,248,1) 100%)',
                }}
              />

              <div className="absolute inset-[1px] z-10 flex flex-col rounded-md bg-slate-900 p-2 md:p-4">
                <div
                  className={`flex flex-col gap-4 text-xl font-semibold md:text-4xl`}
                >
                  Day 1
                </div>
              </div>
            </div>
            <div
              className={`hidden w-[50px] rounded-l-2xl bg-white p-1 lg:block`}
              style={{
                backgroundImage: ` linear-gradient(180deg, #37A9F0 0%, #759FF8 46%, #769FF8 100%)`,
              }}
            ></div>
          </div>
          <div
            className={`hidden flex-1 rounded-t-2xl bg-white p-1 lg:flex`}
            style={{
              backgroundImage: ` linear-gradient(180deg, #37A9F0 0%, #759FF8 46%, #769FF8 100%)`,
            }}
          ></div>
          <div className={`flex w-full flex-col gap-4 md:pl-10 lg:w-1/2`}>
            <div className={`flex gap-4`}>
              <Image src={Tick} alt={'TICK'} />
              <span>
                It is a long established fact that a reader will be distracted.
                readable content of a page when looking at its layout.
              </span>
            </div>
            <div className={`flex gap-4`}>
              <Image src={Tick} alt={'TICK'} />
              <span>
                It is a long established fact that a reader will be distracted.
                readable content of a page when looking at its layout.
              </span>
            </div>
          </div>
        </div>

        <div className={`flex flex-col lg:flex-row-reverse`}>
          <div
            className={`mb-10 flex w-full flex-row-reverse items-center justify-end pt-20 lg:w-1/2`}
          >
            <div className="relative h-12 w-36 md:h-20 md:w-52">
              <div
                className="absolute inset-0 rounded-md"
                style={{
                  background:
                    'linear-gradient(136deg, rgba(56,189,248,1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.0) 60%, rgba(56,189,248,1) 100%)',
                }}
              />

              <div className="absolute inset-[1px] z-10 flex flex-col rounded-md bg-slate-900 p-2 md:p-4">
                <div className={`flex flex-col gap-4 text-xl md:text-4xl font-semibold`}>
                  Day 2
                </div>
              </div>
            </div>
            <div
              className={`hidden w-[50px] rounded-l-2xl bg-white p-1 lg:block`}
              style={{
                backgroundImage: ` linear-gradient(180deg, #37A9F0 0%, #759FF8 46%, #769FF8 100%)`,
              }}
            ></div>
          </div>
          <div
            className={`hidden flex-1 rounded-b-2xl bg-white p-1 lg:flex`}
            style={{
              backgroundImage: ` linear-gradient(180deg, #37A9F0 0%, #759FF8 46%, #769FF8 100%)`,
            }}
          ></div>
          <div
            className={`flex w-full flex-col items-end gap-4 md:pl-10 lg:w-1/2 lg:pl-0 lg:pr-10 lg:pt-20 `}
          >
            <div className={`flex gap-4`}>
              <Image src={Tick} alt={'TICK'} />
              <span>
                It is a long established fact that a reader will be distracted.
                readable content of a page when looking at its layout.
              </span>
            </div>
            <div className={`flex gap-4`}>
              <Image src={Tick} alt={'TICK'} />
              <span>
                It is a long established fact that a reader will be distracted.
                readable content of a page when looking at its layout.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GFGHackathon
