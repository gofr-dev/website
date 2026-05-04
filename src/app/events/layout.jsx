import React from 'react'

export const metadata = {
  title: 'GoFr Events — Conferences, Meetups & Talks',
  description:
    'Upcoming and past GoFr events: conference talks, meetups, workshops, and community gatherings about the opinionated Go microservice framework.',
  metadataBase: new URL('https://gofr.dev'),
  alternates: { canonical: '/events' },
  openGraph: {
    type: 'website',
    url: 'https://gofr.dev/events',
    title: 'GoFr Events',
    description:
      'Upcoming and past GoFr events: talks, meetups, workshops, and community gatherings.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gofr_dev',
    title: 'GoFr Events',
    description: 'Talks, meetups, workshops, and community gatherings.',
    images: ['/twitter-image.png'],
  },
}

const Layout = ({ children }) => children
export default Layout
