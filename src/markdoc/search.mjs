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
                let title =
                  ast.attributes?.frontmatter?.match(
                    /^title:\s*(.*?)\s*$/m,
                  )?.[1]

                // Extract structured sections
                sections = [[title || 'Untitled', null, []]]
                extractSectionsAndContent(ast, sections)

                // Extract ALL raw text content (this is the key improvement)
                let allRawText = extractAllTextFromNode(ast)
                fullRawText = allRawText.join(' ').replace(/\s+/g, ' ').trim()

                // Also include the original markdown for fallback
                fullRawText += ' ' + md.replace(/^---[\s\S]*?---/, '').trim()

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
                let pageTitle = sections[0][0] || 'Untitled'
                
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

              export function search(query, options = {}) {
                try {
                  let defaultOptions = {
                    limit: 10,
                    ...options
                  }
                  
                  let queryLower = query.toLowerCase().trim()
                  let results = []
                  
                  // Search through all indexed content
                  for (let [url, data] of urlToData) {
                    let score = 0
                    
                    // Exact phrase match (highest priority)
                    if (data.searchText.includes(queryLower)) {
                      score += 10
                      
                      // Bonus for title matches
                      if (data.title.toLowerCase().includes(queryLower)) {
                        score += 5
                      }
                      
                      // Bonus for early position in content
                      let position = data.searchText.indexOf(queryLower)
                      if (position < 100) {
                        score += 3
                      }
                      
                      results.push({
                        url: data.url || url,
                        title: data.title || '',
                        pageTitle: data.pageTitle || '',
                        content: data.content || '',
                        score: score
                      })
                    }
                    // Partial word matching
                    else {
                      let queryWords = queryLower.split(/\\s+/).filter(w => w.length > 2)
                      let matchCount = 0
                      
                      for (let word of queryWords) {
                        if (data.searchText.includes(word)) {
                          matchCount++
                        }
                      }
                      
                      if (matchCount > 0) {
                        score = matchCount / queryWords.length
                        results.push({
                          ...data,
                          score: score
                        })
                      }
                    }
                  }
                  
                  
                  // Sort by score and limit results
                  results.sort((a, b) => b.score - a.score)
                  results = results.slice(0, defaultOptions.limit)
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
