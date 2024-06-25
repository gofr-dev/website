import { Hero } from './Hero'
import { Testimonials } from './Testimonials'
import { QuickLink } from '@/components/QuickLinks'
export function HomePage() {
  return (
    <div>
      <Hero />
      <div className="not-prose my-12 grid grid-cols-1 gap-6 px-4 md:grid-cols-3 lg:px-8 xl:px-12">
        <QuickLink
          title="Battle Tested at Enterprise Scale"
          description="Built over years running production workload at great scales in variety of industries."
          icon="presets"
          href="#"
        />
        <QuickLink
          title="Out of the box Observability"
          description="Goodness of Metrics, Traces and Logs without a single line of code. Traces to OpenTelemetry compatible providers, Metrics in Prometheus Format."
          icon="lightbulb"
          href="#"
        />
        <QuickLink
          title="REST Standards by default"
          description="Default behaviour is how 'you' would design a REST API. Status codes, response formats - all taken care by GoFr automagically."
          icon="plugins"
          href="#"
        />
      </div>
      <div className="mx-4 flex flex-col {{ sm:flex-col xs:flex-col md:flex-row lg:flex-row }}  gap-x-8 overflow-y-auto pb-10 gap-y-16 lg:mx-8 xl:mx-12 xl:gap-x-16">
        <Testimonials />
      </div>
    </div>
  )
}
