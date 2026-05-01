import React from 'react'

export const metadata = {
  title: 'GoFr Community — Discord, GitHub, Reddit & More',
  description:
    'Join the GoFr community on Discord, GitHub, Reddit, Twitter, and LinkedIn. Get help, contribute to the framework, share projects, and connect with maintainers and other Go developers.',
  metadataBase: new URL('https://gofr.dev'),
  alternates: { canonical: '/community' },
  openGraph: {
    type: 'website',
    url: 'https://gofr.dev/community',
    title: 'GoFr Community — Discord, GitHub, Reddit & More',
    description:
      'Discord, GitHub, Reddit, Twitter, LinkedIn — connect with the GoFr community.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gofr_dev',
    title: 'GoFr Community',
    description: 'Connect with the GoFr community.',
    images: ['/twitter-image.png'],
  },
}

const Layout = ({ children }) => children
export default Layout
