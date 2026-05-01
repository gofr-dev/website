import { DocsHeader } from '@/components/DocsHeader'
import { DocStructuredData } from '@/components/DocStructuredData'
import { LastUpdatedByline } from '@/components/LastUpdatedByline'
import { PrevNextLinks } from '@/components/PrevNextLinks'
import { Prose } from '@/components/Prose'
import { TableOfContents } from '@/components/TableOfContents'
import { collectSections } from '@/lib/sections'

export function DocsLayout({ children, frontmatter, nodes }) {
  const { title, description } = frontmatter || {}
  const tableOfContents = collectSections(nodes)

  return (
    <>
      {/* JSON-LD (TechArticle + BreadcrumbList) for AI Overview / */}
      {/* Google rich-result citation eligibility. Static-export */}
      {/* pre-renders the script tag at build time, so the schema is */}
      {/* in the HTML payload crawlers actually read. */}
      <DocStructuredData title={title} description={description} />
      <div className="min-w-0 max-w-2xl flex-auto px-4 py-16 lg:max-w-4xl lg:pl-8 lg:pr-0 xl:px-16">
        <article>
          <DocsHeader title={title} />
          {/* Visible freshness byline — populated from per-route */}
          {/* git mtime map at build time. Renders nothing if the */}
          {/* route isn't in the map (e.g. brand-new untracked page). */}
          <LastUpdatedByline />
          <Prose>{children}</Prose>
        </article>
        <PrevNextLinks />
      </div>
      <TableOfContents tableOfContents={tableOfContents} />
    </>
  )
}
