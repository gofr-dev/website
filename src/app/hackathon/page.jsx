import React from 'react';
import GFGSponsor from "@/components/goforgofr/GFGSponsor";
import GFGFaq from "@/components/goforgofr/GFGFaq";
import GFGHero from "@/components/goforgofr/GFGHero";
import GFGServices from "@/components/goforgofr/GFGServices";
import GFGTracks from "@/components/goforgofr/GFGTracks";
import GFGHackathon from "@/components/goforgofr/GFGHackathon";
import GFGPrizes from "@/components/goforgofr/GFGPrizes";
import GFGHeader from "@/components/goforgofr/GFGHeader";

export const metadata = {
    title: "GoFr - Hackathon",
    description: 'Hackathon for GoFr - Innovate , Code, Create & Elevate',
    metadataBase: new URL('https://gofr.dev'),
    keywords: [
        'gofr',
        'go framework',
        'golang framework',
        'golang web framework',
        'http services',
        'gin gonic',
        'go fiber',
        'fiber',
        'fiber app',
        'fiber logs',
        'go recover',
        'fiber set',
        'fiber router',
        'Hackathon',
    ],
}

const Page = () => {

  return (
    <>
      <link href="https://fonts.cdnfonts.com/css/impact" rel="stylesheet" />
      <div className={`flex flex-col gap-4 overflow-hidden bg-slate-900 text-white`}>
        <GFGHeader />

        <GFGHero/>

        <GFGServices/>

        <GFGTracks/>

        <GFGHackathon/>

        <GFGPrizes/>

        {/*<GFGSponsor/>*/}

        <GFGFaq/>
      </div>
    </>
  )
}

export default Page