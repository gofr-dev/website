import React from 'react';

import Image from "next/image";

const GfgServices = () => {
    const icons = [
        {
            icon : '/img/hackathon/icon/MicroService.png',
            label: "Micro Services",
        },
        {
            icon : '/img/hackathon/icon/CloudNativeApp.png',
            label: "Cloud Native Applications",
        },
        {
            icon : '/img/hackathon/icon/Analytics.png',
            label: "Analytics",
        },
        {
            icon : '/img/hackathon/icon/GenAI.png',
            label: "Gen AI",
        },
        {
            icon : '/img/hackathon/icon/DApps.png',
            label: "D Apps",
        },
        {
            icon : '/img/hackathon/icon/BlockChain.png',
            label: "Blockchain",
        }
    ]
    return (
        <div className={`flex justify-between gap-10 w-full flex-wrap px-10 md:px-20 mt-20`}>
            {
                icons.map((icon) => (
                    <div key={icon.label} className={`flex flex-col items-center gap-2 text-xs w-[80px]`}>
                        <img src={icon.icon} alt={icon.label} className={`aspect-square w-[70px]`} loading={'eager'} />
                        <span className={`max-w-[100px] text-center`}>{icon.label}</span>
                    </div>
                ))
            }
        </div>
    );
};

export default GfgServices;