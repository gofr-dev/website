import React from 'react'

export const metadata = {
  title: 'GoFr Examples — REST, gRPC, Pub/Sub, GraphQL, WebSocket',
  description:
    'Real-world GoFr examples covering REST APIs, gRPC, Pub/Sub (Kafka, NATS, Google Pub/Sub), GraphQL, WebSockets, cron jobs, migrations, observability, and more.',
  metadataBase: new URL('https://gofr.dev'),
  alternates: { canonical: '/examples' },
  openGraph: {
    type: 'website',
    url: 'https://gofr.dev/examples',
    title: 'GoFr Examples — REST, gRPC, Pub/Sub, GraphQL, WebSocket',
    description:
      'Runnable Go microservice examples: REST, gRPC, Pub/Sub, GraphQL, WebSocket, cron, migrations, observability.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gofr_dev',
    title: 'GoFr Examples',
    description: 'Runnable Go microservice examples covering all major patterns.',
    images: ['/twitter-image.png'],
  },
}

const Layout = ({ children }) => children
export default Layout
