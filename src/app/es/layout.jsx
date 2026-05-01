import React from 'react'

export const metadata = {
  title: 'GoFr — Un framework de Go con opiniones para microservicios',
  description:
    'GoFr es un framework de Go con opiniones para microservicios en producción. Observabilidad incorporada (OpenTelemetry, Prometheus), 15+ fuentes de datos, gRPC, GraphQL, WebSockets, Pub/Sub. Listo para Kubernetes.',
  metadataBase: new URL('https://gofr.dev'),
  alternates: {
    canonical: '/es',
    languages: {
      en: '/',
      es: '/es',
      'zh-CN': '/zh',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://gofr.dev/es',
    title: 'GoFr — Un framework de Go con opiniones para microservicios',
    description:
      'Construye microservicios en Go con observabilidad incorporada, más de 15 fuentes de datos y cero código repetitivo.',
    locale: 'es_ES',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gofr_dev',
    title: 'GoFr — Framework de Go con opiniones',
    description:
      'Microservicios en Go con observabilidad incorporada y cero boilerplate.',
    images: ['/twitter-image.png'],
  },
}

const Layout = ({ children }) => children
export default Layout
