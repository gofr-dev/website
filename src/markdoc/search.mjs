import Markdoc from '@markdoc/markdoc'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import glob from 'fast-glob'
import * as fs from 'fs'
import * as path from 'path'
import { createLoader } from 'simple-functional-loader'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const slugify = slugifyWithCounter()

// Comprehensive text extraction that gets EVERYTHING
function extractAllTextFromNode(node) {
  let texts = []

  // Direct text content
  if (node.type === 'text' && node.attributes?.content) {
    texts.push(node.attributes.content)
  }

  // Code content
  if (node.type === 'code' && node.attributes?.content) {
    texts.push(node.attributes.content)
  }

  // Code block content
  if (node.type === 'code_block' && node.attributes?.content) {
    texts.push(node.attributes.content)
  }

  // Process all children recursively
  if (node.children && Array.isArray(node.children)) {
    for (let child of node.children) {
      texts.push(...extractAllTextFromNode(child))
    }
  }

  return texts
}

function extractSectionsAndContent(node, sections, isRoot = true) {
  if (isRoot) {
    slugify.reset()
  }

  if (node.type === 'heading') {
    let content = extractAllTextFromNode(node).join('').trim()
    if (node.attributes.level <= 2) {
      let hash = node.attributes?.id ?? slugify(content)
      sections.push([content, hash, []])
    } else {
      // Include smaller headings as content
      if (sections.length > 0) {
        sections.at(-1)[2].push(content)
      }
    }
  } else if (
    node.type === 'paragraph' ||
    node.type === 'list' ||
    node.type === 'item' ||
    node.type === 'blockquote' ||
    node.type === 'code_block'
  ) {
    let content = extractAllTextFromNode(node).join(' ').trim()
    if (content && sections.length > 0) {
      sections.at(-1)[2].push(content)
    }
  }

  // Recursively process children
  if (node.children && Array.isArray(node.children)) {
    for (let child of node.children) {
      extractSectionsAndContent(child, sections, false)
    }
  }
}

export default function withSearch(nextConfig = {}) {
  let cache = new Map()

  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      config.module.rules.push({
        test: __filename,
        use: [
          createLoader(function () {
            let pagesDir = path.resolve('./src/app')
            this.addContextDependency(pagesDir)

            let files = glob.sync('**/page.md', { cwd: pagesDir })
            let data = files.map((file) => {
              let url =
                file === 'page.md' ? '/' : `/${file.replace(/\/page\.md$/, '')}`
              let md = fs.readFileSync(path.join(pagesDir, file), 'utf8')

              let sections
              let fullRawText = ''

              if (cache.get(file)?.[0] === md) {
                sections = cache.get(file)[1]
                fullRawText = cache.get(file)[2]
              } else {
                let ast = Markdoc.parse(md)
                let rawTitle = ast.attributes?.frontmatter?.match(
                  /^title:\s*(.*?)\s*$/m,
                )?.[1]
                // Strip surrounding YAML quotes (single or double) so search
                // results don't render the quoted form: `"My Title"`.
                let title = rawTitle?.replace(/^["'](.*)["']$/, '$1')

                // Extract structured sections. We start with an empty
                // page-level slot whose title we'll resolve below — *not*
                // a literal "Untitled" string, because that would leak
                // through to the search UI as a real-looking page title
                // for any page lacking frontmatter title.
                sections = [['', null, []]]
                extractSectionsAndContent(ast, sections)

                // Resolve the effective page title with three fallbacks:
                //   1. Frontmatter `title:` (preferred)
                //   2. First body heading (sections[1] from the AST walk)
                //   3. URL-derived slug, prettified (last resort)
                // We never store "Untitled" — it's a UX dead end in
                // search results.
                let resolved = title
                if (!resolved && sections.length > 1 && sections[1][0]) {
                  resolved = sections[1][0]
                }
                if (!resolved) {
                  let parts = url.split('/').filter(Boolean)
                  let last = parts[parts.length - 1] || 'Home'
                  resolved = last
                    .split(/[-_]/)
                    .map((w) =>
                      w.length === 0
                        ? ''
                        : w === w.toUpperCase()
                        ? w
                        : w.charAt(0).toUpperCase() + w.slice(1),
                    )
                    .join(' ')
                }
                sections[0][0] = resolved

                // Extract clean text content from the parsed AST. This walks
                // text / code / code_block nodes recursively, so markdown
                // syntax like [text](url), ## heading, **bold**, *italic*
                // never appears in the indexed string — link nodes contribute
                // only their visible text (the part before the parens), and
                // heading/strong/emphasis nodes contribute the inner text.
                // Previously we also appended the raw markdown source as a
                // "fallback", but that polluted snippets with link syntax
                // and ## markers — implementation details the reader
                // shouldn't see.
                let allRawText = extractAllTextFromNode(ast)
                fullRawText = allRawText.join(' ').replace(/\s+/g, ' ').trim()

                cache.set(file, [md, sections, fullRawText])
              }

              return { url, sections, fullRawText }
            })

            // When this file is imported within the application
            // the following module is loaded:
            return `
              import FlexSearch from 'flexsearch'

              const searchIndex = new Map()
              const urlToData = new Map()
              
              let data = ${JSON.stringify(data)}

              // Build comprehensive search data
              for (let { url, sections, fullRawText } of data) {
                // sections[0][0] is always populated by the loader (frontmatter
                // > first body heading > URL slug). Defensive fallback only.
                let pageTitle = sections[0][0] || url
                
                // Index full page
                let pageData = {
                  url: url,
                  title: pageTitle,
                  pageTitle: undefined,
                  content: fullRawText,
                  searchText: (pageTitle + ' ' + fullRawText).toLowerCase()
                }
                urlToData.set(url, pageData)
                
                // Index individual sections
                for (let [title, hash, content] of sections) {
                  if (hash && title) {
                    let sectionUrl = url + '#' + hash
                    let sectionContent = [title, ...content].join(' ')
                    let sectionData = {
                      url: sectionUrl,
                      title: title,
                      pageTitle: pageTitle,
                      content: sectionContent,
                      searchText: (title + ' ' + sectionContent + ' ' + pageTitle + ' ' + fullRawText).toLowerCase()
                    }
                    urlToData.set(sectionUrl, sectionData)
                  }
                }
              }

              // Check if query matches at a word boundary (start of word)
              function wordBoundaryMatch(text, query) {
                try {
                  let escaped = query.replace(/[-\\/\\\\^$*+?.()|[\\]{}]/g, '\\\\$&')
                  let regex = new RegExp('(?:^|[\\\\s\\\\-_\\\\/,.;:()])' + escaped, 'i')
                  return regex.test(text)
                } catch(e) {
                  return text.toLowerCase().includes(query.toLowerCase())
                }
              }

              // Build a snippet of up to maxLen chars centered on the first
              // match of query (or the first matching word) within content.
              // Trims word boundaries on both sides; prefixes/suffixes with
              // an ellipsis if truncated.
              function buildSnippet(content, query, maxLen) {
                if (maxLen === undefined) maxLen = 140
                if (!content || !query) return undefined
                let lower = content.toLowerCase()
                let q = query.toLowerCase()
                let idx = lower.indexOf(q)
                let matchLen = q.length
                if (idx === -1) {
                  // Try matching any single word from a multi-word query
                  let words = q.split(/\\s+/).filter(function (w) { return w.length > 1 })
                  for (let i = 0; i < words.length; i++) {
                    let wIdx = lower.indexOf(words[i])
                    if (wIdx !== -1) {
                      idx = wIdx
                      matchLen = words[i].length
                      break
                    }
                  }
                }
                if (idx === -1) return undefined
                // half can go negative if matchLen > maxLen — clamp to 0
                // so start/end never advance past the actual match. The
                // window then anchors at the match start and grows up to
                // matchLen chars, even if matchLen exceeds maxLen.
                let half = Math.max(0, Math.floor((maxLen - matchLen) / 2))
                let start = Math.max(0, idx - half)
                let end = Math.min(content.length, idx + matchLen + half)
                let head = start > 0 ? '\u2026 ' : ''
                let tail = end < content.length ? ' \u2026' : ''
                let s = content.slice(start, end)
                if (start > 0) s = s.replace(/^\\S*\\s/, '')
                if (end < content.length) s = s.replace(/\\s\\S*$/, '')
                return head + s + tail
              }

              export function search(query, options = {}) {
                try {
                  let limit = (options && options.limit) || 10
                  let queryLower = query.toLowerCase().trim()

                  if (queryLower.length === 0) return { items: [] }

                  let results = []

                  for (let [url, data] of urlToData) {
                    let titleLower = (data.title || '').toLowerCase()
                    let score = 0

                    // 1. Exact title match (highest)
                    if (titleLower === queryLower) {
                      score = 100
                    }
                    // 2. Title starts with query
                    else if (titleLower.startsWith(queryLower)) {
                      score = 50
                    }
                    // 3. Title contains query at word boundary
                    else if (wordBoundaryMatch(titleLower, queryLower)) {
                      score = 30
                    }
                    // 4. Title contains query anywhere (mid-word like "BadgerDB" matching "ad")
                    else if (titleLower.includes(queryLower)) {
                      score = 5
                    }
                    // 5. Content contains query at word boundary
                    else if (wordBoundaryMatch(data.searchText, queryLower)) {
                      score = 15
                    }
                    // 6. Content contains query anywhere
                    else if (data.searchText.includes(queryLower)) {
                      score = 3
                    }
                    // 7. Multi-word: check if all words match
                    else if (queryLower.includes(' ')) {
                      let words = queryLower.split(/\\s+/).filter(w => w.length > 1)
                      let matched = words.filter(w => data.searchText.includes(w))
                      if (matched.length === words.length) {
                        score = 20
                      } else if (matched.length > 0) {
                        score = matched.length * 2
                      }
                    }

                    if (score > 0) {
                      // Bonus: page-level results over section-level (cleaner results)
                      if (!url.includes('#')) score += 2

                      // For very short queries (1-2 chars), suppress mid-word matches
                      if (queryLower.length <= 2 && score <= 5) continue

                      // Always try to build a snippet from the content. Even
                      // when the title matches the query, the snippet is the
                      // primary thing that disambiguates two results that
                      // share a title (e.g. seven datasource pages each with
                      // a "Datasources" section). Returns undefined if the
                      // query never appears in the body — fine, the result
                      // card just renders without a snippet.
                      let snippet = buildSnippet(data.content || '', queryLower)

                      results.push({
                        url: data.url || url,
                        title: data.title || '',
                        pageTitle: data.pageTitle || '',
                        content: data.content || '',
                        snippet: snippet,
                        score: score
                      })
                    }
                  }

                  results.sort((a, b) => b.score - a.score)
                  results = results.slice(0, limit)
                  return { items: results }
                } catch (error) {
                  console.error('Search failed:', error)
                  return { items: [] }
                }
              }
              
              export function searchExact(query, options = {}) {
                try {
                  let queryLower = query.toLowerCase().trim()
                  let exactMatches = []
                  
                  for (let [url, data] of urlToData) {
                    if (data.searchText.includes(queryLower)) {
                      exactMatches.push({
                        url: data.url || url,
                        title: data.title || '',
                        pageTitle: data.pageTitle || '',
                        content: data.content || '',
                        score: 10
                      })
                    }
                  }
                  
                  return { items: exactMatches.slice(0, options.limit || 10) }
                } catch (error) {
                  console.error('Exact search failed:', error)
                  return { items: [] }
                }
              }
              
              // Debug function to check what content is indexed
              export function debugSearch(query) {
                console.log('Total indexed items:', urlToData.size)
                console.log('Sample content:')
                let count = 0
                for (let [url, data] of urlToData) {
                  if (count < 3) {
                    console.log('URL:', url)
                    console.log('Content preview:', data.content.substring(0, 200) + '...')
                    console.log('---')
                    count++
                  }
                }
                
                if (query) {
                  let queryLower = query.toLowerCase()
                  for (let [url, data] of urlToData) {
                    if (data.searchText.includes(queryLower)) {
                      console.log('Found in:', url)
                      let index = data.searchText.indexOf(queryLower)
                      console.log('Context:', data.searchText.substring(Math.max(0, index - 50), index + query.length + 50))
                      break
                    }
                  }
                }
              }
            `
          }),
        ],
      })

      if (typeof nextConfig.webpack === 'function') {
        return nextConfig.webpack(config, options)
      }

      return config
    },
  })
}
