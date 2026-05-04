'use client'
import CompanyList from './CompanyTrustedList'
import DBlistComponent from './DBlistComponent'
import { Hero } from './Hero'
import { QuickLink } from '@/components/QuickLinks'
import { EcosystemRecognition } from '@/components/EcosystemRecognition'
import { FadeInOnScroll } from '@/components/FadeInOnScroll'
import { StaggerChildren } from '@/components/StaggerChildren'
import blurCyanImage from "@/images/blur-cyan.png";
import Image from "next/image";
import React from "react";
import Testimonials from "@/components/Reviews";
// Substance first: pitch the framework's value, then prove it. Hero →
// features → datasources establishes what GoFr does and what it
// integrates with; the trailing block (logos → ecosystem →
// testimonials) is one cohesive credibility cluster instead of being
// split across the page. DBlist + CompanyList share the same dark
// `bg-gray-900` band, so the transition between them reads as one
// continuous strip rather than two seams.
export function HomePage() {
  return (
    <div className="m-auto w-auto max-w-screen-2xl">
      {/* Density-matched section padding. Uniform `py-24` everywhere
          made the page feel padded-for-padding's-sake when section
          content was thin (a 100 px marquee strip, a 1-row logo wall).
          The pattern Vercel / Stripe / Tailwind use is to scale
          padding to content height: substantial sections breathe more,
          thin sections sit closer together. */}
      <Hero />
      <StaggerChildren className="not-prose grid grid-cols-1 gap-6 px-4 py-20 md:grid-cols-3 lg:px-8 xl:px-12">
        <QuickLink
          title="Battle-Tested at Enterprise Scale"
          description="Built over years running production workloads at great scale in a variety of industries."
          icon="presets"
        />
        <QuickLink
          title="Out-of-the-box Observability"
          description="Goodness of Metrics, Traces and Logs without a single line of code. Traces to OpenTelemetry compatible providers, Metrics in Prometheus Format."
          icon="lightbulb"
        />
        <QuickLink
          title="REST Standards by default"
          description="Default behaviour is how 'you' would design a REST API. Status codes, response formats - all taken care of by GoFr automagically."
          icon="plugins"
        />
        <QuickLink
          title="Middleware support"
          description="Elevate productivity effortlessly with predefined middleware, while retaining flexibility through seamless integration of custom middleware tailored to your specific needs."
          icon="middleware"
        />
        <QuickLink
          title="Environment-based config"
          description="Following the 12-factor config principles for maintaining application configurations, simplify the integration of data sources like MySQL, Postgres, Kafka, Google Pubsub, NATS JetStream and others."
          icon="env"
        />
        <QuickLink
          title="Crash Handling"
          description="GoFr catches panics and automatically recovers to maintain continuous availability of your server."
          icon="crash"
        />
          {/* Decorative blur orb. `pointer-events-none` is critical: */}
          {/* without it, this absolutely-positioned image floats over */}
          {/* sections below the feature grid (DBlist, ecosystem cards, */}
          {/* testimonials) and silently swallows their clicks. */}
          {/* `select-none` prevents accidental drag-selection of the */}
          {/* decorative image on touch devices. Hidden on small */}
          {/* screens — purely decorative and overflows the viewport */}
          {/* on mobile due to negative margins / absolute positioning. */}
          {/* Dropped `unoptimized`: orb PNGs are 200+ KB each, letting */}
          {/* Next.js serve WebP/AVIF cuts ~60-70% off the wire. Below */}
          {/* the fold, so swap `priority` for native lazy loading. */}
          {/* `unoptimized` is required: this site builds with */}
          {/* output: 'export', which disables /_next/image. Without */}
          {/* unoptimized, Next emits a /_next/image?url=... src that */}
          {/* 404s in production and renders as a broken-image icon. */}
          <Image
              aria-hidden="true"
              className="pointer-events-none absolute mt-80 hidden select-none opacity-25 sm:block"
              src={blurCyanImage}
              alt=""
              width={530}
              height={530}
              loading="lazy"
              unoptimized
          />

      </StaggerChildren>

      {/* Thin marquee strip — minimal external padding (component */}
      {/* already has its own internal padding). */}
      <FadeInOnScroll className="py-8"><DBlistComponent /></FadeInOnScroll>
      {/* Logo wall — medium. */}
      <FadeInOnScroll className="py-12"><CompanyList /></FadeInOnScroll>
      {/* 3 ecosystem cards — substantial. */}
      <FadeInOnScroll className="py-20"><EcosystemRecognition /></FadeInOnScroll>
      {/* Testimonials masonry — substantial. */}
      <FadeInOnScroll className="py-20"><Testimonials /></FadeInOnScroll>
    </div>
  )
}
