import Markdoc from '@markdoc/markdoc'
import { slugifyWithCounter } from '@sindresorhus/slugify'
import glob from 'fast-glob'
import * as fs from 'fs'
import * as path from 'path'
import { createLoader } from 'simple-functional-loader'
import * as url from 'url'

const __filename = url.fileURLToPath(import.meta.url)
const slugify = slugifyWithCounter()

function toString(node) {
  let str =
    node.type === 'text' && typeof node.attributes?.content === 'string'
      ? node.attributes.content
      : ''
  if ('children' in node) {
    for (let child of node.children) {
      str += toString(child)
    }
  }
  return str
}

function extractSections(node, sections, isRoot = true) {
  if (isRoot) {
    slugify.reset()
  }
  if (node.type === 'heading' || node.type === 'paragraph') {
    let content = toString(node).trim()
    if (node.type === 'heading' && node.attributes.level <= 2) {
      let hash = node.attributes?.id ?? slugify(content)
      sections.push([content, hash, []])
    } else {
      sections.at(-1)[2].push(content)
    }
  } else if ('children' in node) {
    for (let child of node.children) {
      extractSections(child, sections, false)
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

              if (cache.get(file)?.[0] === md) {
                sections = cache.get(file)[1]
              } else {
                let ast = Markdoc.parse(md)
                let title =
                  ast.attributes?.frontmatter?.match(
                    /^title:\s*(.*?)\s*$/m,
                  )?.[1]
                sections = [[title, null, []]]
                extractSections(ast, sections)
                cache.set(file, [md, sections])
              }

              return { url, sections }
            })

            // When this file is imported within the application
            // the following module is loaded:
            return `
              import FlexSearch from 'flexsearch'

              let sectionIndex = new FlexSearch.Document({
                tokenize: 'full',
                document: {
                  id: 'url',
                  index: 'content',
                  store: ['title', 'pageTitle'],
                },
                context: {
                  resolution: 9,
                  depth: 2,
                  bidirectional: true
                }
              })

              let data = ${JSON.stringify(data)}

              for (let { url, sections } of data) {
                for (let [title, hash, content] of sections) {
                  sectionIndex.add({
                    url: url + (hash ? ('#' + hash) : ''),
                    title,
                    content: [title, ...content].join('\\n'),
                    pageTitle: hash ? sections[0][0] : undefined,
                  })
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
