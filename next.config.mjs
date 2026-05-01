import withMarkdoc from '@markdoc/next.js'
import { createLoader } from 'simple-functional-loader'

import withSearch from './src/markdoc/search.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  pageExtensions: ['js', 'jsx', 'md', 'ts', 'tsx'],
  webpack(config) {
    config.module.rules.unshift({
      test: /\.md$/,
      use: [
        createLoader(function (source) {
          // Inject metadataBase so Open Graph and Twitter image URLs
          // resolve to gofr.dev in production builds. The frontmatter
          // `nextjs.metadata` block layers title/description on top.
          //
          // We also auto-derive page-level `openGraph` and `twitter`
          // title/description from the frontmatter's top-level title and
          // description. Without this, every Markdoc page inherits the
          // root layout's openGraph.title / twitter.title — meaning every
          // social share preview shows the home page's card. The author of
          // a doc can still override by setting `nextjs.metadata.openGraph`
          // or `nextjs.metadata.twitter` explicitly in frontmatter.
          return (
            source +
            `
const __pageMeta = frontmatter.nextjs?.metadata || {};
const __pageTitle = typeof __pageMeta.title === 'string' ? __pageMeta.title : undefined;
const __pageDesc = typeof __pageMeta.description === 'string' ? __pageMeta.description : undefined;
export const metadata = {
  metadataBase: new URL("https://gofr.dev"),
  ...__pageMeta,
  openGraph: {
    type: 'article',
    ...(__pageTitle ? { title: __pageTitle } : {}),
    ...(__pageDesc ? { description: __pageDesc } : {}),
    ...(__pageMeta.openGraph || {}),
  },
  twitter: {
    card: 'summary_large_image',
    ...(__pageTitle ? { title: __pageTitle } : {}),
    ...(__pageDesc ? { description: __pageDesc } : {}),
    ...(__pageMeta.twitter || {}),
  },
};
`
          )
        }),
      ],
    })

    return config
  },
}

export default withSearch(
  withMarkdoc({ schemaPath: './src/markdoc' })(nextConfig),
)
