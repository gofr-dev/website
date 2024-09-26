import React from 'react';

const GfgSponsorCard = ({name , subName}) => {
    return (
      <div className={`mb-10`}>
        <div className="relative h-64 w-64">
          <div
            className="absolute inset-0 rounded-md"
            style={{
              background:
                'linear-gradient(136deg, rgba(56,189,248,1) 0%, rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,1) 50%, rgba(0,0,0,0.5) 55%, rgba(0,0,0,0.0) 60%, rgba(56,189,248,1) 100%);',
            }}
          />

          <div className="absolute inset-[1px] z-10 flex flex-col justify-end rounded-md bg-slate-900 p-4">
            <div></div>
          </div>

          <div className={`absolute bottom-0 left-0 z-20 translate-y-[42px]`}>
            <h2
              className="text-2xl font-bold tracking-wide text-white"
              style={{
                fontFamily: 'Impact, sans-serif',
              }}
            >
              {name}
            </h2>
            <p className="text-sm text-red-500 italic">{subName}</p>
          </div>
        </div>
      </div>
    )
};

export default GfgSponsorCard;