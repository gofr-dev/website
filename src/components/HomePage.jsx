'use client'
import CompanyList from './CompanyTrustedList'
import DBlistComponent from './DBlistComponent'
import { Hero } from './Hero'
import { QuickLink } from '@/components/QuickLinks'
import { EcosystemRecognition } from '@/components/EcosystemRecognition'
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
      <Hero />
      <div className="not-prose my-12 grid grid-cols-1 gap-6 px-4 md:grid-cols-3 lg:px-8 xl:px-12">
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
          <Image
              className="absolute mt-80 opacity-25 pointer-events-none"
              src={blurCyanImage}
              alt=""
              width={'h-44'}
              unoptimized
              priority
          />
      </div>

      <DBlistComponent />
      <CompanyList />
      <EcosystemRecognition />
      <Testimonials />
    </div>
  )
}
