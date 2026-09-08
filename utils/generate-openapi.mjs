#!/usr/bin/env node
// Generate public/openapi.json — a machine-readable description of the
// read surface gofr.dev actually exposes.
//
// gofr.dev is a documentation site, not a SaaS product: there is no
// hosted GoFr API to describe, and inventing one would hand agents
// endpoints that 404. What *is* real is a set of stable, fetchable
// documents — llms.txt, llms-full.txt, the sitemap, the per-section
// indexes, and a Markdown twin for every page. Those are genuinely
// useful as agent tools, so that is what this spec covers.
//
// The `path` parameter of getPageMarkdown is enumerated from the twin
// list emitted by generate-md-twins.mjs, so an agent doing LLM
// function-calling against this spec can only ask for pages that
// exist. Run order matters: md-twins first, then this.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { SECTIONS, SITE_URL } from './lib/doc-sections.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const routesFile = path.join(repoRoot, 'src/data/md-twin-routes.json')
const outFile = path.join(repoRoot, 'public/openapi.json')

let routes = []
if (fs.existsSync(routesFile)) {
  routes = JSON.parse(fs.readFileSync(routesFile, 'utf8'))
}

const markdownDoc = {
  description: 'The page rendered as Markdown.',
  content: {
    'text/markdown': { schema: { type: 'string' } },
  },
}

// Every operation is a static file fetch, so the only client-side
// failure is "that path does not exist".
const notFound = {
  description:
    'No such document. Re-read /llms.txt or /sitemap.xml for valid paths.',
  content: { 'text/markdown': { schema: { type: 'string' } } },
}

const sectionSlugs = SECTIONS.filter((s) => s.slug).map((s) => s.slug)

const spec = {
  openapi: '3.1.0',
  info: {
    title: 'GoFr Documentation Content API',
    version: '1.0.0',
    summary: 'Read-only access to gofr.dev documentation as Markdown.',
    description: [
      'gofr.dev publishes its documentation as static, versioned files that',
      'agents can fetch directly. Every operation below is an unauthenticated',
      'HTTP GET against https://gofr.dev.',
      '',
      'Use this when you need GoFr framework knowledge: how to build a Go',
      'microservice with built-in observability, connect a datasource, add',
      'gRPC/GraphQL/WebSockets/Pub-Sub, or migrate an existing service to GoFr.',
      '',
      'There is no GoFr product API — GoFr is an open-source Go framework you',
      'import into your own service. This spec describes the documentation',
      'surface only. See https://gofr.dev/auth.md for the (anonymous) access',
      'model.',
    ].join('\n'),
    license: { name: 'Apache-2.0', identifier: 'Apache-2.0' },
    contact: { name: 'GoFr', url: `${SITE_URL}/contact`, email: 'connect@gofr.dev' },
  },
  servers: [{ url: SITE_URL, description: 'Production' }],
  // An explicitly empty security requirement is how OpenAPI says "no
  // authentication" — as opposed to omitting the field, which only
  // means "unspecified". gofr.dev is genuinely public; see /auth.md.
  security: [],
  components: { securitySchemes: {} },
  externalDocs: { description: 'GoFr documentation', url: `${SITE_URL}/docs` },
  tags: [
    { name: 'index', description: 'Site-wide indexes for LLM ingestion' },
    { name: 'content', description: 'Individual documentation pages' },
  ],
  paths: {
    '/llms.txt': {
      get: {
        operationId: 'getLlmsIndex',
        tags: ['index'],
        summary: 'Curated link index (llmstxt.org format)',
        description:
          'A short, curated Markdown index of the whole site, including a ' +
          '"when to use GoFr" section. Start here to decide which page to fetch.',
        responses: { 200: markdownDoc, 404: notFound },
      },
    },
    '/llms-full.txt': {
      get: {
        operationId: 'getLlmsFullDump',
        tags: ['index'],
        summary: 'Every documentation page concatenated into one file',
        description:
          'The complete documentation as a single Markdown document. Use when ' +
          'you can ingest a long context in one request instead of crawling ' +
          'page by page. Several hundred KB.',
        responses: { 200: markdownDoc, 404: notFound },
      },
    },
    '/docs/llms.txt': {
      get: {
        operationId: 'getDocsIndex',
        tags: ['index'],
        summary: 'Documentation section index',
        description: 'Lists each documentation section and its scoped index.',
        responses: { 200: markdownDoc, 404: notFound },
      },
    },
    '/docs/{section}/llms.txt': {
      get: {
        operationId: 'getSectionIndex',
        tags: ['index'],
        summary: 'Scoped index for one documentation section',
        description:
          'Every page in one section, with titles and descriptions. Cheaper ' +
          'than the full dump when the task is scoped to one area.',
        parameters: [
          {
            name: 'section',
            in: 'path',
            required: true,
            description: 'Documentation section slug.',
            schema: { type: 'string', enum: sectionSlugs },
          },
        ],
        responses: { 200: markdownDoc, 404: notFound },
      },
    },
    '/{page}.md': {
      get: {
        operationId: 'getPageMarkdown',
        tags: ['content'],
        summary: 'Fetch one documentation page as Markdown',
        description:
          'Returns the page body as Markdown with a top-level heading, with ' +
          'all internal links rewritten to absolute URLs. Equivalent to ' +
          'requesting the HTML route with `Accept: text/markdown`.',
        parameters: [
          {
            name: 'page',
            in: 'path',
            required: true,
            description:
              'Route without the leading slash and without the .md suffix, ' +
              'e.g. `docs/quick-start/introduction`.',
            schema: {
              type: 'string',
              enum: routes.map((r) => r.replace(/^\//, '')),
            },
          },
        ],
        responses: { 200: markdownDoc, 404: notFound },
      },
    },
    '/sitemap.xml': {
      get: {
        operationId: 'getSitemap',
        tags: ['index'],
        summary: 'XML sitemap of every canonical HTML page',
        description:
          'Canonical HTML URLs with accurate <lastmod> values derived from git ' +
          'history. Markdown twins are deliberately not listed.',
        responses: {
          200: {
            description: 'Sitemap document.',
            content: { 'application/xml': { schema: { type: 'string' } } },
          },
          404: notFound,
        },
      },
    },
    '/changelog.xml': {
      get: {
        operationId: 'getChangelogFeed',
        tags: ['index'],
        summary: 'RSS feed of GoFr releases',
        responses: {
          200: {
            description: 'RSS 2.0 feed.',
            content: { 'application/rss+xml': { schema: { type: 'string' } } },
          },
          404: notFound,
        },
      },
    },
    '/AGENTS.md': {
      get: {
        operationId: 'getAgentsPrimer',
        tags: ['index'],
        summary: 'Conventions primer for AI coding assistants',
        description:
          'GoFr conventions, datasource patterns, and per-framework migration ' +
          'mappings, written for coding agents generating GoFr code.',
        responses: { 200: markdownDoc, 404: notFound },
      },
    },
  },
}

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, JSON.stringify(spec, null, 2) + '\n')
console.log(
  `[openapi] wrote ${Object.keys(spec.paths).length} path(s), ${routes.length} enumerated page(s)`,
)
