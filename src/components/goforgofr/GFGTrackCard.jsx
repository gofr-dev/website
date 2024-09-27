import React from 'react';
import Image from "next/image";

const GfgTrackCard = ({ data }) => {
  return (
    <div className={`relative`}>
      <span className={`w-[20px] h-1 bg-sky-400 rounded-2xl absolute top-1/2 left-0 -translate-x-[calc(100%+4px)] md:hidden`}></span>
      <div className="relative h-40 w-52 lg:w-64">
        <div
          className="absolute inset-0 rounded-md"
          style={{
            background:
              'linear-gradient(136deg, rgba(56,189,248,1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.0) 60%, rgba(56,189,248,1) 100%)',
          }}
        />

        <div className="absolute inset-[1px] z-10 flex flex-col rounded-md bg-slate-900 p-4">
          <div className={`flex flex-col gap-4`}>
            <Image src={data.icon} alt={data.title} width={50} height={50} className={`aspect-square w-[30px]`} />
              <span className={`font-semibold`}>{data.title}</span>
              <span className={`text-gray-400`}>{data.description}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GfgTrackCard;