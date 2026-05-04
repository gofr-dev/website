import React from 'react'

export const metadata = {
  title: 'GoFr Changelog — Release Notes & Updates',
  description:
    'Browse GoFr release notes, version history, and feature updates. See what changed in each release of the opinionated Go microservice framework.',
  metadataBase: new URL('https://gofr.dev'),
  alternates: { canonical: '/changelog' },
  openGraph: {
    type: 'website',
    url: 'https://gofr.dev/changelog',
    title: 'GoFr Changelog — Release Notes & Updates',
    description:
      'Release notes, version history, and feature updates for the GoFr Go microservice framework.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gofr_dev',
    title: 'GoFr Changelog',
    description: 'Release notes and version history for GoFr.',
    images: ['/twitter-image.png'],
  },
}

const Layout = ({ children }) => children
export default Layout
