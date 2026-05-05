import { ShowcaseGradient } from '@/components/ShowcaseGradient'

// Wrapper for the SEO-only Markdoc pages (/why-gofr, /comparison/*,
// /migrate/*, /learn, /faq). It supplies the flex container DocsLayout
// expects, but unlike DocsPage it does NOT render a left sidebar — these
// pages aren't core navigation, they're SEO landing content. Right-rail
// "On this page" TOC from DocsLayout still renders. Cross-links to the
// other SEO pages live in the global footer.
//
// `withGradient` adds the decorative orb layer (ShowcaseGradient).
// Opt-in because /faq and /learn are reading-mode reference pages
// where the gradient is just visual noise; /why-gofr, /comparison/*,
// /migrate/* are positioning surfaces where it belongs.
export function MarketingPage({ children, withGradient = false }) {
  return (
    <div>
      <div
        className={
          'relative mx-auto flex w-full max-w-screen-2xl flex-auto justify-center sm:px-2 lg:px-8 xl:px-12' +
          (withGradient ? ' overflow-x-clip' : '')
        }
      >
        {withGradient && <ShowcaseGradient />}
        {children}
      </div>
    </div>
  )
}
