import React from 'react'

export const metadata = {
  title: 'GoFr Showcase — Companies & Engineers Using GoFr in Production',
  description:
    'Discover the engineers and companies running GoFr in production. From Fortune 500 enterprises to indie teams, see who is using the opinionated Go microservice framework.',
  metadataBase: new URL('https://gofr.dev'),
  alternates: { canonical: '/showcase' },
  openGraph: {
    type: 'website',
    url: 'https://gofr.dev/showcase',
    title: 'GoFr Showcase — Engineers Using GoFr in Production',
    description:
      'Companies and engineers running GoFr in production microservices, from Fortune 500 enterprises to indie teams.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gofr_dev',
    title: 'GoFr Showcase',
    description: 'Engineers and companies using GoFr in production.',
    images: ['/twitter-image.png'],
  },
}

const Layout = ({ children }) => children
export default Layout
