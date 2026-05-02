import withMarkdoc from '@markdoc/next.js'
import { createLoader } from 'simple-functional-loader'

import withSearch from './src/markdoc/search.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // `output: 'export'` disables Next's image optimisation API
  // (/_next/image). Without `images.unoptimized = true`, every
  // <Image> tag emits a /_next/image?url=... src that 404s in
  // production and renders as a browser broken-image icon. Setting
  // it once here means we don't need to remember `unoptimized` on
  // every <Image> usage. PNG/JPG sizes are managed at the source.
  images: { unoptimized: true },
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
const __og = {
  ...(__pageTitle ? { title: __pageTitle } : {}),
  ...(__pageDesc ? { description: __pageDesc } : {}),
  ...(__pageMeta.openGraph || {}),
};
const __tw = {
  ...(__pageTitle ? { title: __pageTitle } : {}),
  ...(__pageDesc ? { description: __pageDesc } : {}),
  ...(__pageMeta.twitter || {}),
};
// Only emit openGraph / twitter when the page actually carries
// per-page values. If we always emitted an object, Next's metadata
// merge would replace the parent layout's openGraph wholesale and
// strip its title/description for pages with no frontmatter.
export const metadata = {
  metadataBase: new URL("https://gofr.dev"),
  ...__pageMeta,
  ...(Object.keys(__og).length ? { openGraph: { type: 'article', ...__og } } : {}),
  ...(Object.keys(__tw).length ? { twitter: { card: 'summary_large_image', ...__tw } } : {}),
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
