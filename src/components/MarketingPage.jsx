// Wrapper for the SEO-only Markdoc pages (/why-gofr, /comparison/*,
// /migrate/*, /learn, /faq). It supplies the flex container DocsLayout
// expects, but unlike DocsPage it does NOT render a left sidebar — these
// pages aren't core navigation, they're SEO landing content. Right-rail
// "On this page" TOC from DocsLayout still renders. Cross-links to the
// other SEO pages live in the global footer.
export function MarketingPage({ children }) {
  return (
    <div>
      <div className="relative mx-auto flex w-full max-w-screen-2xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12">
        {children}
      </div>
    </div>
  )
}
