#!/usr/bin/env node
// Renders every release in src/app/changelog/releases.json the way the
// /changelog page does and fails if any of them comes out wrong: Markdoc
// can't parse it, a release loses all its content, a section ends up
// inside another one, or raw markdown (table rows, [text](url), #
// headings) survives outside code. Runs in prebuild, so a regression in
// the release-notes renderer — or a release body it can't handle — shows
// up in CI instead of on gofr.dev.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import Markdoc from '@markdoc/markdoc'

import {
  headingText,
  isSectionHeading,
  isTitleHeading,
  normalizeReleaseMarkdown,
  releaseMarkdocConfig,
  splitReleaseSections,
} from '../src/app/changelog/releaseMarkdown.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const releasesPath = path.join(repoRoot, 'src/app/changelog/releases.json')

const RAW_MARKDOWN = [
  ['table row', /\|\s*:?-{3,}:?\s*\|/],
  ['markdown link', /\]\((https?:|\/|#)/],
  ['heading', /(^|\n)\s*#{1,6}\s+\S/],
]

// Visible text of rendered HTML, without code, which may legitimately
// contain any of the patterns above.
function visibleText(html) {
  return html
    .replace(/<Fence[\s\S]*?<\/Fence>/g, '')
    .replace(/<code>[\s\S]*?<\/code>/g, '')
    .replace(/<[^>]+>/g, '\n')
}

// Plain text of a node's inline content (text and inline code).
function nodeText(node) {
  if (node.type === 'text' || node.type === 'code') {
    return node.attributes.content ?? ''
  }
  return node.children.map(nodeText).join('')
}

// Headings that should have started a section of their own (or, for a
// version title, been dropped) but are still at the top level of a
// section's content. They are read from Markdoc's parse of what is
// rendered, not from the splitter, so a splitter that swallows a section
// can't hide it: the swallowed heading renders as a real <h3>, not as raw
// markdown, and would pass the raw-markdown patterns below.
function swallowedHeadings(ast) {
  return ast.children
    .filter((node) => node.type === 'heading')
    .map((node) => ({
      depth: node.attributes.level,
      label: headingText(nodeText(node)),
    }))
    .filter(
      ({ depth, label }) =>
        isTitleHeading(label) || isSectionHeading(depth, label),
    )
    .map(({ depth, label }) => `${'#'.repeat(depth)} ${label}`)
}

function checkRelease(release) {
  const problems = []
  const sections = splitReleaseSections(release.body)
  if (sections.length === 0 && /\w/.test(release.body ?? '')) {
    problems.push('no content left after splitting into sections')
  }

  for (const section of sections) {
    const ast = Markdoc.parse(normalizeReleaseMarkdown(section.content))
    for (const e of Markdoc.validate(ast, releaseMarkdocConfig)) {
      if (e.error.level !== 'critical') continue
      problems.push(
        `${section.label}: line ${(e.lines?.[0] ?? 0) + 1}: ${e.error.message}`,
      )
    }

    for (const heading of swallowedHeadings(ast)) {
      problems.push(
        `${section.label}: "${heading}" should be its own section but is inside this one`,
      )
    }

    const html = Markdoc.renderers.html(
      Markdoc.transform(ast, releaseMarkdocConfig),
    )
    const text = visibleText(html)
    for (const [what, pattern] of RAW_MARKDOWN) {
      if (pattern.test(text))
        problems.push(`${section.label}: raw ${what} in the output`)
    }
  }

  return problems
}

function main() {
  const releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'))
  let failed = 0

  for (const release of releases) {
    const problems = checkRelease(release)
    if (problems.length === 0) continue
    failed++
    console.error(`[check-changelog] ${release.tag}:`)
    for (const p of problems) console.error(`  - ${p}`)
  }

  if (failed > 0) {
    console.error(
      `[check-changelog] ${failed} of ${releases.length} release(s) don't render correctly.`,
    )
    process.exit(1)
  }
  console.log(
    `[check-changelog] all ${releases.length} release(s) render cleanly.`,
  )
}

main()
