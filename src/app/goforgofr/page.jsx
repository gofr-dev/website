import React from 'react';
import GFGSponsor from "@/components/goforgofr/GFGSponsor";
import GFGFaq from "@/components/goforgofr/GFGFaq";
import GFGHero from "@/components/goforgofr/GFGHero";
import GFGServices from "@/components/goforgofr/GFGServices";
import GFGTracks from "@/components/goforgofr/GFGTracks";
import GFGHackathon from "@/components/goforgofr/GFGHackathon";
import GFGPrizes from "@/components/goforgofr/GFGPrizes";

const Page = () => {
  return (
    <>
      <link href="https://fonts.cdnfonts.com/css/impact" rel="stylesheet" />
      <div className={`flex flex-col gap-4`}>
        <div className={`flex items-center gap-4 p-4`}>
          <a
            aria-label="Home page"
            className="flex items-center gap-2 text-3xl font-bold"
            href="/"
          >
            <span className="italic text-sky-400">Go</span>
            <span className="not-italic text-slate-700 dark:text-white">
              Fr
            </span>
          </a>

          <div className={`ml-16 items-center gap-4 md:gap-16 font-semibold hidden md:flex`}>
            <a href={'#'}>Schedule</a>
            <a href={'#sponsors_section'} className={`min-w-[120px]`}>Our sponsors</a>
            <a href={'#'}>Prizes</a>
            <a href={'#faq_section'}>Faq</a>
          </div>
        </div>

        <GFGHero />

        <GFGServices />

        <GFGTracks />

        <GFGHackathon />

        <GFGPrizes />

        <GFGSponsor />

        <GFGFaq />
      </div>
    </>
  )
}

export default Page