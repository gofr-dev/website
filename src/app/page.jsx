import { HomePage } from '@/components/HomePage'

export const metadata = {
  title: 'GoFr — An Opinionated Go Framework',
  description:
    'An Opinionated Go Framework for accelerated microservice development. Built-in observability, 15+ datasources, gRPC, GraphQL, WebSockets, and pub/sub.',
  metadataBase: new URL('https://gofr.dev'),
  alternates: {
    canonical: '/',
    // Cold-arrival path: an agent that lands here from web search finds
    // the Markdown homepage without having to read llms.txt first.
    // Markdoc routes get this automatically from the loader in
    // next.config.mjs; .jsx routes have to declare it.
    types: {
      'text/markdown': '/index.md',
    },
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
  logo: 'https://gofr.dev/img/gofr-logo.png',
  sameAs: [
    'https://github.com/gofr-dev/gofr',
    'https://twitter.com/gofr_dev',
    'https://www.linkedin.com/company/gofr-dev',
    'https://discord.gg/5ACeSKGt37',
    'https://www.reddit.com/r/gofr/',
  ],
  // Lets AI assistants answer "how do I contact GoFr / report a
  // vulnerability" without scraping. Each contactType maps to a real,
  // monitored channel documented on /contact and in
  // /.well-known/security.txt — nothing here is a placeholder.
  //
  // NOTE: schema.org `address` is deliberately absent. GoFr is a
  // distributed open-source project with no public postal address, and
  // inventing a PostalAddress to satisfy a validator would be worse
  // than omitting it. Add one here if a registered address is ever
  // published.
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'technical support',
      email: 'connect@gofr.dev',
      url: 'https://gofr.dev/contact',
      availableLanguage: ['English'],
    },
    {
      '@type': 'ContactPoint',
      contactType: 'security',
      email: 'connect@gofr.dev',
      url: 'https://gofr.dev/.well-known/security.txt',
      availableLanguage: ['English'],
    },
  ],
}

// WebSite node. Ties the domain to the entity and, for AI clients,
// advertises that every page has a Markdown representation.
//
// `potentialAction: SearchAction` is intentionally omitted: search on
// gofr.dev is a client-side FlexSearch index with no /search?q= route,
// so a SearchAction would point at a URL that does not resolve.
const webSiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'GoFr',
  alternateName: 'GoFr Framework',
  url: 'https://gofr.dev',
  description:
    'Documentation for GoFr, an opinionated Go framework for production microservice development.',
  inLanguage: 'en',
  publisher: { '@type': 'Organization', name: 'GoFr', url: 'https://gofr.dev' },
  license: 'https://www.apache.org/licenses/LICENSE-2.0',
  encoding: {
    '@type': 'MediaObject',
    encodingFormat: 'text/markdown',
    contentUrl: 'https://gofr.dev/index.md',
  },
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteLd) }}
      />
      <HomePage />
    </>
  )
}

export default Home
