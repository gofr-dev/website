import { HomePage } from '@/components/HomePage'

export const metadata = {
  title: 'GoFr — An Opinionated Go Framework',
  description:
    'An Opinionated Go Framework for accelerated microservice development. Built-in observability, 15+ datasources, gRPC, GraphQL, WebSockets, and pub/sub.',
  metadataBase: new URL('https://gofr.dev'),
  alternates: {
    canonical: '/',
  },
  keywords: [
    'gofr',
    'go framework',
    'golang framework',
    'go web framework',
    'golang web framework',
    'go microservice framework',
    'golang microservice framework',
    'opinionated go framework',
    'production go framework',
    'go framework with observability',
    'go framework opentelemetry',
    'go framework kubernetes',
    'go grpc framework',
    'go graphql server',
    'go websocket server',
    'go pubsub framework',
  ],
  openGraph: {
    type: 'website',
    url: 'https://gofr.dev/',
    siteName: 'GoFr',
    title: 'GoFr — An Opinionated Go Framework',
    description:
      'An Opinionated Go Framework for accelerated microservice development. Built-in observability, 15+ datasources, gRPC, GraphQL, WebSockets, and pub/sub.',
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
  other: {
    'go-import': 'gofr.dev git https://github.com/gofr-dev/gofr',
  },
}

// SoftwareApplication + Organization schema makes GoFr eligible for
// Google's software rich result and gives AI search engines a clean,
// attributable description of what GoFr is and where to find it.
const softwareApplicationLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'GoFr',
  applicationCategory: 'DeveloperApplication',
  operatingSystem: 'Linux, macOS, Windows',
  description:
    'An opinionated Go framework for production microservice development with built-in observability, 15+ datasource integrations, gRPC, GraphQL, WebSockets, and zero-boilerplate REST handlers.',
  url: 'https://gofr.dev',
  programmingLanguage: 'Go',
  license: 'https://github.com/gofr-dev/gofr/blob/main/LICENSE',
  codeRepository: 'https://github.com/gofr-dev/gofr',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: 'GoFr',
    url: 'https://gofr.dev',
  },
}

const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'GoFr',
  url: 'https://gofr.dev',
  logo: 'https://gofr.dev/img/gofr-logo.svg',
  sameAs: [
    'https://github.com/gofr-dev/gofr',
    'https://twitter.com/gofr_dev',
    'https://www.linkedin.com/company/gofr-dev',
    'https://discord.gg/5ACeSKGt37',
    'https://www.reddit.com/r/gofr/',
  ],
}

const Home = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }}
      />
      <HomePage />
    </>
  )
}

export default Home
