import { Hero } from './Hero'
import { Testimonials } from './Testimonials'
import { QuickLink } from '@/components/QuickLinks'
export function HomePage() {
  return (
    <div className="m-auto w-auto max-w-screen-2xl">
      <Hero />
      <div className="not-prose my-12 grid grid-cols-1 gap-6 px-4 md:grid-cols-3 lg:px-8 xl:px-12">
        <QuickLink
          title="Battle Tested at Enterprise Scale"
          description="Built over years running production workload at great scales in variety of industries."
          icon="presets"
        />
        <QuickLink
          title="Out of the box Observability"
          description="Goodness of Metrics, Traces and Logs without a single line of code. Traces to OpenTelemetry compatible providers, Metrics in Prometheus Format."
          icon="lightbulb"
        />
        <QuickLink
          title="REST Standards by default"
          description="Default behaviour is how 'you' would design a REST API. Status codes, response formats - all taken care by GoFr automagically."
          icon="plugins"
        />
        <QuickLink
          title="Middleware support"
          description="Elevate productivity effortlessly with predefined middleware's, while retaining flexibility through seamless integration of custom middleware tailored to your specific needs."
          icon="middleware"
        />
        <QuickLink
          title="Environment based config"
          description="Following the 12-factor config principles for maintaining application configurations, simplify the integration of data sources like MySQL, Postgres, Kafka, Google Pubsub, and others."
          icon="env"
        />
        <QuickLink
          title="Crash Handling"
          description="GoFr catches all and every panics and automatically recovers from them to maintain continuous availability of your server."
          icon="crash"
        />
      </div>
      <div className="mx-4 flex flex-col {{ sm:flex-col xs:flex-col md:flex-row lg:flex-row }}  gap-x-8 overflow-y-auto pb-10 gap-y-16 lg:mx-8 xl:mx-12 xl:gap-x-16">
        <Testimonials />
      </div>
    </div>
  )
}
