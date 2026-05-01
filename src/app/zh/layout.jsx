import React from 'react'

export const metadata = {
  title: 'GoFr — 一个有主见的 Go 微服务框架',
  description:
    'GoFr 是一个面向生产微服务的 Go 框架，开箱即用的可观测性（OpenTelemetry、Prometheus）、15+ 数据源、gRPC、GraphQL、WebSocket、Pub/Sub，专为 Kubernetes 部署而生。',
  metadataBase: new URL('https://gofr.dev'),
  alternates: {
    canonical: '/zh',
    languages: {
      en: '/',
      es: '/es',
      'zh-CN': '/zh',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    url: 'https://gofr.dev/zh',
    title: 'GoFr — 一个有主见的 Go 微服务框架',
    description:
      '使用 Go 构建生产级微服务：开箱即用的可观测性、15+ 数据源、零样板代码。',
    locale: 'zh_CN',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@gofr_dev',
    title: 'GoFr — Go 微服务框架',
    description: '开箱即用的可观测性，零样板代码。',
    images: ['/twitter-image.png'],
  },
}

const Layout = ({ children }) => children
export default Layout
