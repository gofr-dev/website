import React from 'react'

export const metadata = {
  title: 'GoFr Roadmap — What\u2019s Next',
  description:
    'GoFr roadmap, generated automatically from open milestones and enhancement-labeled issues on GitHub. Browse what the maintainers and community are working on next.',
  metadataBase: new URL('https://gofr.dev'),
  alternates: { canonical: '/roadmap' },
  openGraph: {
    type: 'website',
    url: 'https://gofr.dev/roadmap',
    title: 'GoFr Roadmap — What\u2019s Next',
    description:
      'Open milestones and enhancement issues, surfaced live from the GoFr repo.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gofr_dev',
    title: 'GoFr Roadmap',
    description: 'What\u2019s next for GoFr — pulled live from GitHub.',
    images: ['/twitter-image.png'],
  },
}

const Layout = ({ children }) => children
export default Layout
