import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import clsx from 'clsx'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'
import FooterUi from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Use local version of Lexend so that we can use OpenType features
const lexend = localFont({
  src: '../fonts/lexend.woff2',
  display: 'swap',
  variable: '--font-lexend',
})

export const metadata = {
  title: {
    template: '%s - Docs',
    default: 'GoFr - An opinionated Go Framework',
  },
  description: 'For accelerated microservice development',
  metadataBase: new URL('https://gofr.dev'),
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx('h-full antialiased', inter.variable, lexend.variable)}
      suppressHydrationWarning
    >
      <head>
        <meta
          name="google-site-verification"
          content="9TFTpJ19XHm0dVVKTF5l6OTMLcahEn0M3aZFZ14gRFI"
        />
        <meta
          name="go-import"
          content="gofr.dev git https://github.com/gofr-dev/gofr"
        />
        <meta
          property="og:title"
          content="GoFr - An opinionated Go Framework"
        />
        <meta
          property="og:description"
          content="For accelerated microservice development"
        ></meta>
        <meta property="og:url" content="https://gofr.dev/"></meta>
        <meta property="og:type" content="website"></meta>

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-QEC53YYXB8"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
          function gtag(){
            window.dataLayer.push(arguments)
          }
          gtag('js', new Date());
          gtag('config', 'G-QEC53YYXB8');
          `,
          }}
        />
      </head>

      <body className="flex min-h-full flex-col bg-white dark:bg-slate-900">
        <Providers>
          <Layout>{children}</Layout>
          <FooterUi />
        </Providers>
      </body>
    </html>
  )
}
