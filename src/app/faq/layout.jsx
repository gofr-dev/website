'use client'
import { MarketingPage } from '@/components/MarketingPage'
import { FaqSearchProvider } from '@/components/Faq'

// Wrap the FAQ page in FaqSearchProvider so the search input sits at
// the top of the article and filters every {% faq %} block below it.
const Layout = ({ children }) => (
  <MarketingPage>
    <FaqSearchProvider>{children}</FaqSearchProvider>
  </MarketingPage>
)
export default Layout
