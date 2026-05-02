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

// Site-wide defaults. Per-route metadata (page.jsx `metadata` exports
// or Markdoc `nextjs.metadata` frontmatter) overrides the title /
// description / openGraph.{title,description,url} on a per-page basis;
// site-wide values like the social image, the Twitter handles, and
// type=website inherit through unless explicitly overridden.
//
// Important: this used to be hardcoded as <meta> tags inside the
// <head> JSX, which silently overrode every per-page metadata setting
// — every subpage was sharing the home page's social card. Moving it
// into the metadata export lets Next's metadata-merge actually do its
// job.
export const metadata = {
  metadataBase: new URL('https://gofr.dev'),
  title: {
    default: 'GoFr — An Opinionated Go Framework',
    template: '%s | GoFr',
  },
  description:
    'An Opinionated Go Framework for accelerated microservice development. Built-in observability, 15+ datasources, gRPC, GraphQL, WebSockets, and pub/sub.',
  // Canonical intentionally omitted from the root layout — setting it
  // to '/' would brand every subpage as a duplicate of the home page.
  // Per-page metadata sets its own canonical via `alternates.canonical`
  // (or via Next's URL-based default when metadataBase is set).
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-snippet': -1,
      'max-image-preview': 'large',
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    siteName: 'GoFr',
    title: 'GoFr — An Opinionated Go Framework',
    description:
      'An Opinionated Go Framework for accelerated microservice development. Built-in observability, 15+ datasources, gRPC, GraphQL, WebSockets, and pub/sub.',
    url: 'https://gofr.dev/',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'GoFr — An Opinionated Go Framework',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gofr_dev',
    creator: '@gofr_dev',
    title: 'GoFr — An Opinionated Go Framework',
    description:
      'An Opinionated Go Framework for accelerated microservice development. Built-in observability, 15+ datasources, gRPC, GraphQL, WebSockets, and pub/sub.',
    images: ['/twitter-image.png'],
  },
  verification: {
    google: [
      'MVkGpVWwO1qPJIoXAKXQs5b6oKwxLAMLWtDDMeD23hE',
      '9TFTpJ19XHm0dVVKTF5l6OTMLcahEn0M3aZFZ14gRFI',
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, lexend.variable)}
      suppressHydrationWarning
    >
      <head>
        {/* AI / LLM discoverability. Two signals every page emits: */}
        {/*  - `rel="alternate"` with text/plain + text/markdown so */}
        {/*    crawlers that follow rel-alternate links pick them up. */}
        {/*  - The original "ai" + "llm" rel values are not yet a W3C */}
        {/*    standard but match the convention emerging across sites */}
        {/*    that have published llms.txt — costs nothing to emit. */}
        {/* The hreflang on rel="alternate" is intentionally omitted */}
        {/* because these resources are language-neutral indexes. */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM index (llmstxt.org)" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="LLM full content dump" />
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
