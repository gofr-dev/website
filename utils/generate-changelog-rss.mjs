#!/usr/bin/env node
// Generates `public/changelog.xml` — an RSS 2.0 feed of GoFr releases
// from src/app/changelog/releases.json. Devs subscribe to RSS feeds
// for release announcements; without one they have to remember to
// check the page or rely on the Twitter / Medium accounts. Pure
// static — runs at build time only, no runtime API.

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const releasesPath = path.join(repoRoot, 'src/app/changelog/releases.json')
const outFile = path.join(repoRoot, 'public/changelog.xml')

const SITE_URL = 'https://gofr.dev'
const FEED_URL = `${SITE_URL}/changelog.xml`

function escapeXml(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function rfc822(d) {
  return new Date(d).toUTCString()
}

if (!fs.existsSync(releasesPath)) {
  console.warn(`[changelog-rss] ${releasesPath} not present; skipping.`)
  process.exit(0)
}

const releases = JSON.parse(fs.readFileSync(releasesPath, 'utf8'))
const items = releases
  .filter((r) => r.tag && r.date)
  .slice(0, 50)
  .map((r) => `
    <item>
      <title>${escapeXml(`GoFr ${r.tag}`)}</title>
      <link>${escapeXml(r.url || `${SITE_URL}/changelog`)}</link>
      <guid isPermaLink="false">${escapeXml(r.tag)}</guid>
      <pubDate>${rfc822(r.date)}</pubDate>
      <description><![CDATA[${r.body ?? ''}]]></description>
    </item>`).join('')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>GoFr Releases</title>
    <link>${SITE_URL}/changelog</link>
    <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml"/>
    <description>Release notes for GoFr — an opinionated Go framework for production microservices.</description>
    <language>en-us</language>
    <lastBuildDate>${rfc822(new Date())}</lastBuildDate>${items}
  </channel>
</rss>
`

fs.mkdirSync(path.dirname(outFile), { recursive: true })
fs.writeFileSync(outFile, xml)
console.log(`[changelog-rss] wrote ${items.split('<item>').length - 1} releases to ${outFile}`)
