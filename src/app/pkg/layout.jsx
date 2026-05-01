// Routes under /pkg/** exist only to serve the Go module-import path
// convention (gofr.dev/pkg/...). When a human or crawler hits one,
// PkgRedirect bounces them to the equivalent /docs URL via JS.
//
// We don't want these vanity URLs in search results: they have no
// meaningful content and competing with the real /docs pages would
// dilute SERP rank. `robots: noindex, nofollow` keeps them out.
//
// They're also excluded from sitemap.xml in src/app/sitemap.js so
// crawlers never discover them via that route.
export const metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
}

export default function Layout({ children }) {
  return children
}
