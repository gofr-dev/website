"use client"
import React, {useEffect, useState} from 'react';
import GFGSponsor from "@/components/goforgofr/GFGSponsor";
import GFGFaq from "@/components/goforgofr/GFGFaq";
import GFGHero from "@/components/goforgofr/GFGHero";
import GFGServices from "@/components/goforgofr/GFGServices";
import GFGTracks from "@/components/goforgofr/GFGTracks";
import GFGHackathon from "@/components/goforgofr/GFGHackathon";
import GFGPrizes from "@/components/goforgofr/GFGPrizes";
import GFGHeader from "@/components/goforgofr/GFGHeader";

const Page = () => {

  return (
    <>
      <link href="https://fonts.cdnfonts.com/css/impact" rel="stylesheet" />
      <div className={`flex flex-col gap-4`}>
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