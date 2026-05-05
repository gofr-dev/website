#!/usr/bin/env node
// Generate public/llms-full.txt — a single concatenated plaintext
// dump of every Markdoc page on the site, with a short header per
// page identifying its route. AGENTS.md advertises this URL as the
// "everything in one file" variant for AI tools that can ingest a
// long-context dump rather than crawling page-by-page (Anthropic
// Files API, OpenAI Assistants File Search, ChatGPT custom GPT
// knowledge).
//
// Sources are walked in priority order: quick-start first (the
// answer-most-likely-needed), then advanced-guide, datasources,
// references, why-gofr, comparison, migrate, learn, faq.
//
// Run via npm prebuild + npm run refresh-data.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const outFile = path.join(repoRoot, 'public/llms-full.txt')

// Order of inclusion roughly matches the typical "what does an AI
// assistant need first?" priority. Higher-utility content earlier so
// when an LLM truncates context, the foundational material survives.
const SECTIONS = [
  { dir: 'src/app/docs/quick-start',    label: 'Quick Start' },
  { dir: 'src/app/docs/advanced-guide', label: 'Advanced Guide' },
  { dir: 'src/app/docs/datasources',    label: 'Datasources' },
  { dir: 'src/app/docs/guides',         label: 'Production guides' },
  { dir: 'src/app/docs/references',     label: 'References' },
  { dir: 'src/app/why-gofr',            label: 'Why GoFr' },
  { dir: 'src/app/comparison',          label: 'Comparison' },
  { dir: 'src/app/migrate',             label: 'Migration guides' },
  { dir: 'src/app/learn',               label: 'Learn' },
  { dir: 'src/app/faq',                 label: 'FAQ' },
]

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      walk(full, acc)
    } else if (entry.name === 'page.md') {
      acc.push(full)
    }
  }
  return acc
}

function pageFileToRoute(absFile) {
  const rel = path
    .relative(path.join(repoRoot, 'src/app'), absFile)
    .replace(/\\/g, '/')
  const route = '/' + rel.replace(/\/?page\.md$/, '')
  return route === '/' ? '/' : route
}

// Strip frontmatter (yaml between --- markers) so the dump is pure
// content. Markdoc tags ({% answer %}, {% faq %}, …) are left as-is
// because they communicate intent and most LLMs handle them fine; if
// that turns out noisy in practice we can swap to a markdoc.parse →
// transform → text emit pipeline.
function stripFrontmatter(text) {
  if (!text.startsWith('---')) return text
  const end = text.indexOf('\n---', 3)
  if (end === -1) return text
  return text.slice(end + 4).replace(/^\n+/, '')
}

const SITE_URL = 'https://gofr.dev'

const header = [
  '# GoFr — full content dump',
  '',
  '> Concatenated plaintext of every public docs page on https://gofr.dev.',
  '> Intended for AI tools that ingest a single long context (Anthropic Files',
  '> API, OpenAI Assistants File Search, ChatGPT custom GPT knowledge, etc.)',
  '> rather than crawling page-by-page.',
  '',
  `> Generated: ${new Date().toISOString()}`,
  '> Site: https://gofr.dev  ·  Repo: https://github.com/gofr-dev/gofr',
  '',
  '> For a smaller curated link index instead: https://gofr.dev/llms.txt',
  '> For an AI-coding-assistant primer: https://gofr.dev/AGENTS.md',
  '',
  '---',
  '',
]

let body = []
let pageCount = 0

for (const section of SECTIONS) {
  const dir = path.join(repoRoot, section.dir)
  const files = walk(dir)
  if (files.length === 0) continue

  body.push('', `# ${section.label}`, '')
  for (const file of files.sort()) {
    const route = pageFileToRoute(file)
    const raw = fs.readFileSync(file, 'utf8')
    const content = stripFrontmatter(raw).trim()
    if (!content) continue

    body.push(
      `## ${SITE_URL}${route}`,
      '',
      content,
      '',
      '---',
      '',
    )
    pageCount++
  }
}

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, header.concat(body).join('\n'))

const sizeKb = (fs.statSync(outFile).size / 1024).toFixed(1)
console.log(
  `[llms-full] wrote ${pageCount} page(s) (${sizeKb} KB) to ${path.relative(repoRoot, outFile)}`,
)
