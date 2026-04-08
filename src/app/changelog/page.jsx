'use client'

import { useState } from 'react'
import Link from 'next/link'
import releases from './releases.json'

function formatDate(dateStr) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  })
}

// Simple markdown-to-JSX renderer for GitHub release notes
function RenderMarkdown({ text }) {
  if (!text) return null

  // Split into lines and process
  let lines = text.split('\n')
  let elements = []
  let inCodeBlock = false
  let codeLines = []
  let codeLang = ''

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Code block toggle
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${i}`} className="my-3 overflow-x-auto rounded-lg bg-slate-950 p-4 text-sm text-slate-300">
            <code>{codeLines.join('\n')}</code>
          </pre>
        )
        codeLines = []
        inCodeBlock = false
      } else {
        inCodeBlock = true
        codeLang = line.trim().replace('```', '')
      }
      continue
    }

    if (inCodeBlock) {
      codeLines.push(line)
      continue
    }

    // Skip top-level release title (# Release v1.x.x)
    if (/^#\s+Release\s+v/i.test(line.trim())) continue
    if (/^#\s+\*\*v/i.test(line.trim())) continue

    // Skip section headers like ## Features, ## Fixes (we handle these separately)
    if (/^##\s+/.test(line.trim())) continue

    // Sub-headers (### Something)
    if (/^###\s+/.test(line.trim())) {
      let text = line.replace(/^###\s+/, '').replace(/[🔹🚀🔧🛠️]/g, '').trim()
      text = renderInline(text)
      elements.push(
        <h4 key={`h-${i}`} className="mt-4 mb-1 text-sm font-semibold text-white">
          {text}
        </h4>
      )
      continue
    }

    // Empty lines
    if (line.trim() === '') continue

    // Bullet points
    if (/^\s*[-*]\s+/.test(line)) {
      let text = line.replace(/^\s*[-*]\s+/, '')
      elements.push(
        <li key={`li-${i}`} className="ml-4 text-sm text-slate-400">
          {renderInline(text)}
        </li>
      )
      continue
    }

    // Regular paragraph
    if (line.trim()) {
      elements.push(
        <p key={`p-${i}`} className="text-sm text-slate-400">
          {renderInline(line.trim())}
        </p>
      )
    }
  }

  return <div className="space-y-1">{elements}</div>
}

// Render inline markdown (bold, code, links)
function renderInline(text) {
  if (!text) return text

  // Remove emoji prefixes and GitHub colon-emoji syntax
  text = text.replace(/[🔹🚀🔧🛠️💎⚡]/g, '').trim()
  text = text.replace(/:small_blue_diamond:/g, '')
  text = text.replace(/:rocket:/g, '')
  text = text.replace(/:wrench:/g, '')
  text = text.replace(/:hammer_and_wrench:/g, '')
  text = text.replace(/:gem:/g, '')
  text = text.replace(/:zap:/g, '')
  text = text.replace(/:white_check_mark:/g, '')
  text = text.replace(/:warning:/g, '')
  text = text.replace(/:bug:/g, '')
  text = text.replace(/:sparkles:/g, '')
  text = text.replace(/:[a-z_]+:/g, '').trim()

  // Split on bold markers and inline code
  let parts = []
  let remaining = text
  let key = 0

  while (remaining.length > 0) {
    // Bold: **text**
    let boldMatch = remaining.match(/\*\*(.*?)\*\*/)
    // Inline code: `text`
    let codeMatch = remaining.match(/`(.*?)`/)

    // Find the earliest match
    let nextBold = boldMatch ? remaining.indexOf(boldMatch[0]) : Infinity
    let nextCode = codeMatch ? remaining.indexOf(codeMatch[0]) : Infinity

    if (nextBold === Infinity && nextCode === Infinity) {
      parts.push(remaining)
      break
    }

    if (nextBold <= nextCode && boldMatch) {
      if (nextBold > 0) parts.push(remaining.slice(0, nextBold))
      parts.push(
        <strong key={`b-${key++}`} className="font-semibold text-slate-200">
          {boldMatch[1]}
        </strong>
      )
      remaining = remaining.slice(nextBold + boldMatch[0].length)
    } else if (codeMatch) {
      if (nextCode > 0) parts.push(remaining.slice(0, nextCode))
      parts.push(
        <code key={`c-${key++}`} className="rounded bg-slate-800 px-1.5 py-0.5 text-xs text-sky-300">
          {codeMatch[1]}
        </code>
      )
      remaining = remaining.slice(nextCode + codeMatch[0].length)
    }
  }

  return parts.length > 0 ? parts : text
}

function parseRelease(body) {
  if (!body) return []

  let sections = []
  let currentSection = null
  let currentContent = []

  for (let line of body.split('\n')) {
    // Detect section headers: ## 🚀 Features, ## 🔧 Enhancements, ## 🛠️ Fixes
    if (/^##\s+/.test(line.trim())) {
      if (currentSection) {
        sections.push({ type: currentSection, content: currentContent.join('\n') })
      }
      let header = line.replace(/^##\s+/, '').replace(/[🚀🔧🛠️]/g, '').trim()
      if (/feature/i.test(header)) currentSection = 'features'
      else if (/enhancement/i.test(header)) currentSection = 'enhancements'
      else if (/fix/i.test(header)) currentSection = 'fixes'
      else currentSection = header.toLowerCase()
      currentContent = []
      continue
    }

    // Skip release title
    if (/^#\s+/.test(line.trim()) && !/^##/.test(line.trim())) continue

    if (currentSection) {
      currentContent.push(line)
    }
  }

  if (currentSection) {
    sections.push({ type: currentSection, content: currentContent.join('\n') })
  }

  return sections
}

const sectionStyles = {
  features: { label: 'Features', color: 'text-violet-400', badge: 'bg-violet-500/10 text-violet-400' },
  enhancements: { label: 'Enhancements', color: 'text-sky-400', badge: 'bg-sky-500/10 text-sky-400' },
  fixes: { label: 'Fixes', color: 'text-amber-400', badge: 'bg-amber-500/10 text-amber-400' },
}

function ReleaseCard({ release, isLatest }) {
  let [expanded, setExpanded] = useState(isLatest)
  let sections = parseRelease(release.body)
  let sectionTypes = sections.map(s => s.type)

  return (
    <div className={`relative border-l-2 pl-8 pb-12 ${isLatest ? 'border-sky-500' : 'border-slate-800'}`}>
      <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 ${isLatest ? 'border-sky-500 bg-sky-500' : 'border-slate-700 bg-slate-900'}`} />

      <div className="flex flex-wrap items-center gap-3">
        <span className={`rounded-full px-3 py-1 text-sm font-bold ${isLatest ? 'bg-sky-500/20 text-sky-400' : 'bg-slate-800 text-slate-300'}`}>
          {release.tag}
        </span>
        <span className="text-sm text-slate-500">{formatDate(release.date)}</span>
        {isLatest && (
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
            Latest
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {sectionTypes.map(type => {
          let style = sectionStyles[type] || { label: type, badge: 'bg-slate-800 text-slate-400' }
          return (
            <span key={type} className={`rounded px-2 py-0.5 text-xs ${style.badge}`}>
              {style.label}
            </span>
          )
        })}
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-3 flex items-center gap-1 rounded-md px-2 py-1 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-300"
      >
        <svg
          className={`h-4 w-4 transition-transform duration-200 ${expanded ? 'rotate-90' : ''}`}
          viewBox="0 0 16 16" fill="none"
        >
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {expanded ? 'Hide details' : 'Show details'}
      </button>

      {expanded && (
        <div className="mt-4 space-y-6">
          {sections.map((section, idx) => {
            let style = sectionStyles[section.type] || { label: section.type, color: 'text-slate-300' }
            return (
              <div key={idx} className="rounded-lg border border-slate-800 p-4">
                <h3 className={`mb-3 text-sm font-bold uppercase tracking-wider ${style.color}`}>
                  {style.label}
                </h3>
                <RenderMarkdown text={section.content} />
              </div>
            )
          })}
        </div>
      )}

      <Link
        href={release.url}
        target="_blank"
        className="mt-3 inline-flex items-center gap-1 text-xs text-slate-500 transition-colors hover:text-sky-400"
      >
        View on GitHub
        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none">
          <path d="M3.5 3.5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M8.5 3.5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </Link>
    </div>
  )
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold tracking-tight text-white">
          Changelog
        </h1>
        <p className="mt-3 text-lg text-slate-400">
          Release notes and version history for GoFr.
        </p>

        <div className="mt-12">
          {releases.map((release, index) => (
            <ReleaseCard key={release.tag} release={release} isLatest={index === 0} />
          ))}
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-center">
          <Link
            href="https://github.com/gofr-dev/gofr/releases"
            target="_blank"
            className="text-sm text-slate-400 transition-colors hover:text-sky-400"
          >
            View all releases on GitHub →
          </Link>
        </div>
      </div>
    </div>
  )
}
