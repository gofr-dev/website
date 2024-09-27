import React from 'react';

import Prizes from '@/images/goforgofr/Text/PRIZES.svg';
import Prize1 from '@/images/goforgofr/Prize1.svg';
import Prize2 from '@/images/goforgofr/Prize2.svg';
import Prize3 from '@/images/goforgofr/Prize3.svg';
import Prize4 from '@/images/goforgofr/Prize4.svg';
import Image from "next/image";

const GfgPrizes = () => {
    return (
        <div className={`flex flex-col gap-10 px-10 md:px-20 min-h-screen my-20`}>
            <div>
                <Image src={Prizes} alt={"Prizes"} width={200} height={100} />
            </div>
            <div className={`text-slate-400`}>
                It is a long established fact that a reader will be distracted.
                readable content of a page when looking at its layout. It is a long established fact that a reader will be distracted.
                readable content of a page when looking at its layout.
            </div>
            <div className={`flex flex-col justify-center items-center sm:items-stretch sm:flex-row gap-4`}>
                <div className={`w-full sm:w-1/2 flex`}>
                    <Image src={Prize1} alt={"Prize1"} width={200} height={100} className={`w-full flex-1 object-cover rounded-2xl`}/>
                </div>
                <div className={`flex flex-col gap-4 w-full sm:w-1/2`}>
                    <Image src={Prize2} alt={"Prize1"} width={200} height={100} className={`w-full rounded-2xl`}/>
                    <Image src={Prize3} alt={"Prize1"} width={200} height={100} className={`w-full rounded-2xl`}/>
                    <Image src={Prize4} alt={"Prize1"} width={200} height={100} className={`w-full rounded-2xl`}/>
                </div>
            </div>
        </div>
    );
};

export default GfgPrizes;