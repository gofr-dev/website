import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import { GoogleTagManager } from '@next/third-parties/google'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Use local version of Lexend so that we can use OpenType features
const lexend = localFont({
  src: '../fonts/lexend.woff2',
  display: 'swap',
  variable: '--font-lexend',
})

// Default metadataBase for any page that doesn't override it. Makes
// social Open Graph / Twitter image URLs resolve to gofr.dev instead of
// localhost during build.
export const metadata = {
  metadataBase: new URL('https://gofr.dev'),
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, lexend.variable)}
      suppressHydrationWarning
    >
      <head>
        <meta name="google-site-verification" content="MVkGpVWwO1qPJIoXAKXQs5b6oKwxLAMLWtDDMeD23hE" />
        <meta
          name="google-site-verification"
          content="9TFTpJ19XHm0dVVKTF5l6OTMLcahEn0M3aZFZ14gRFI"
        />
        <meta
          property="og:title"
          content="GoFr — An Opinionated Go Framework"
        />
        <meta
          property="og:description"
          content="An Opinionated Go Framework. For accelerated microservice development."
        ></meta>
        <meta property="og:url" content="https://gofr.dev/"></meta>
        <meta property="og:type" content="website"></meta>
        <meta property="og:image" content="https://gofr.dev/opengraph-image.png" />
        <meta property="og:site_name" content="GoFr" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@gofr_dev" />
        <meta name="twitter:creator" content="@gofr_dev" />
        <meta name="twitter:title" content="GoFr — An Opinionated Go Framework" />
        <meta name="twitter:description" content="An Opinionated Go Framework. For accelerated microservice development." />
        <meta name="twitter:image" content="https://gofr.dev/twitter-image.png" />

        {/* AI / LLM discoverability. Two signals every page emits: */}
        {/*  - `rel="alternate"` with text/plain + text/markdown so */}
        {/*    crawlers that follow rel-alternate links pick them up. */}
        {/*  - The original "ai" + "llm" rel values are not yet a W3C */}
        {/*    standard but match the convention emerging across sites */}
        {/*    that have published llms.txt — costs nothing to emit. */}
        {/* The hreflang on rel="alternate" is intentionally omitted */}
        {/* because these resources are language-neutral indexes. */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM index (llmstxt.org)" />
        <link rel="alternate" type="text/markdown" href="/AGENTS.md" title="AI assistant context" />
        <link rel="llm" type="text/plain" href="/llms.txt" />
        <link rel="ai-context" type="text/markdown" href="/AGENTS.md" />

        <GoogleTagManager gtmId="GTM-5G6KD5VJ" />
      </head>

      <body className="flex  flex-col  bg-white dark:bg-slate-900">
        <Providers>
          <ErrorBoundary>
            <Layout>{children}</Layout>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}
