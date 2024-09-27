import React from 'react';

import Microservice from "@/images/goforgofr/icon/MicroService.png"
import CloudNativeApp from "@/images/goforgofr/icon/CloudNativeApp.png"
import DApps from "@/images/goforgofr/icon/DApps.png"
import BlockChain from "@/images/goforgofr/icon/BlockChain.png"
import Analytics from "@/images/goforgofr/icon/Analytics.png"
import GenAI from "@/images/goforgofr/icon/GenAI.png"

import Image from "next/image";

const GfgServices = () => {
    const icons = [
        {
            icon : Microservice,
            label: "Micro Services",
        },
        {
            icon : CloudNativeApp,
            label: "Cloud Native Applications",
        },
        {
            icon : DApps,
            label: "D Apps",
        },
        {
            icon : BlockChain,
            label: "Blockchain",
        },
        {
            icon : Analytics,
            label: "Analytics",
        },
        {
            icon : GenAI,
            label: "Gen AI",
        }
    ]
    return (
        <div className={`flex justify-between gap-10 w-full flex-wrap px-10 md:px-20`}>
            {
                icons.map((icon) => (
                    <div key={icon.label} className={`flex flex-col items-center gap-2 text-xs w-[80px]`}>
                        <Image src={icon.icon} alt={icon.label} width={50} height={50} className={`aspect-square w-[70px]`} />
                        <span className={`max-w-[100px] text-center`}>{icon.label}</span>
                    </div>
                ))
            }
        </div>
    );
};

export default GfgServices;