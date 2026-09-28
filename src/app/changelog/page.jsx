import releases from './releases.json'
import { ChangelogClient } from './ChangelogClient'
import { splitReleaseSections } from './releaseMarkdown.mjs'
import { ReleaseNotes } from './releaseNotes'

// Release notes are rendered here, on the server, at build time. The
// client component only receives finished markup, so neither the markdown
// renderer nor the raw release bodies are shipped in the page's JS.
export default function ChangelogPage() {
  const items = releases.map((release) => ({
    tag: release.tag,
    date: release.date,
    url: release.url,
    sections: splitReleaseSections(release.body).map((section) => ({
      type: section.type,
      label: section.label,
      notes: <ReleaseNotes source={section.content} />,
    })),
  }))

  return <ChangelogClient releases={items} />
}
