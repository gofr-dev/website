import React from 'react'

export const metadata = {
  title: 'Team — The People Behind GoFr',
  description:
    'The creator and maintainers behind GoFr, plus the broader community of contributors who ship the framework.',
  metadataBase: new URL('https://gofr.dev'),
  alternates: { canonical: '/team' },
  openGraph: {
    type: 'website',
    url: 'https://gofr.dev/team',
    title: 'Team — The People Behind GoFr',
    description:
      'Creator, maintainers, and contributors building GoFr.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gofr_dev',
    title: 'GoFr Team',
    description: 'The people behind GoFr.',
    images: ['/twitter-image.png'],
  },
}

// Preconnect to GitHub's avatar CDN — every team card and every
// contributor avatar dot pulls from avatars.githubusercontent.com,
// so opening the connection early saves ~200-400ms of DNS+TLS RTT
// per visitor on first paint of the contributor wall.
const Layout = ({ children }) => (
  <>
    <link rel="preconnect" href="https://avatars.githubusercontent.com" crossOrigin="anonymous" />
    <link rel="dns-prefetch" href="https://avatars.githubusercontent.com" />
    {children}
  </>
)

export default Layout
