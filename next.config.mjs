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
          return (
            source +
            '\nexport const metadata = { metadataBase: new URL("https://gofr.dev"), ...(frontmatter.nextjs?.metadata || {}) };'
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
