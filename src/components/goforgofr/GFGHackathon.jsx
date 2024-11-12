import React from 'react'

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
    <div className={`flex flex-col px-10 pt-20 md:px-20`} id={"Schedule"}>
      <div className={`flex flex-col gap-4`}>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-left max-w-2xl font-extrabold bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-transparent'>24 hrs</h1>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-left max-w-2xl font-extrabold bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-transparent'>HACKATHON</h1>
      </div>

      <div className={`mt-10 text-gray-400`}>
        Join our round-the-clock hackathon—where creativity flows, delicious
        snacks are endless, stress-buster games await, and a feast of food keeps
        you energized for innovation!
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
                Starts with an exciting opening ceremony, followed by the first
                hack round.
              </span>
            </div>
            <div className={`flex gap-4`}>
              <Image src={Tick} alt={'TICK'} />
              <span>
                The first judging round will take place at 5 PM, with round two
                scheduled for 10 PM to keep the momentum going.
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
                <div
                  className={`flex flex-col gap-4 text-xl font-semibold md:text-4xl`}
                >
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
            className={`flex w-full flex-col gap-4 md:pl-10 lg:w-1/2 lg:pl-0 lg:pr-10 lg:pt-20 `}
          >
            <div className={`flex gap-4`}>
              <Image src={Tick} alt={'TICK'} />
              <span>
                Recharge with a midnight stress-buster game, then continue
                hacking through the night.
              </span>
            </div>
            <div className={`flex gap-4`}>
              <Image src={Tick} alt={'TICK'} />
              <span>
                The final technical round happens at 6 AM, followed by the final
                pitch presentations at 10 AM, where the best solutions will take
                the spotlight!
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GFGHackathon
