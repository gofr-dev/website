'use client'
import { Fragment, useState } from 'react'
import { Highlight, Prism } from 'prism-react-renderer'
import bashLang from 'refractor/lang/bash'
import copy from 'copy-to-clipboard'

bashLang(Prism)

const languageNames = {
  js: 'JavaScript', javascript: 'JavaScript',
  ts: 'TypeScript', typescript: 'TypeScript',
  go: 'Go', bash: 'Bash', sh: 'Shell', shell: 'Shell',
  json: 'JSON', yaml: 'YAML', yml: 'YAML', sql: 'SQL',
  protobuf: 'Protobuf', proto: 'Protobuf',
  dockerfile: 'Dockerfile', graphql: 'GraphQL',
  dotenv: '.env', env: '.env',
  html: 'HTML', css: 'CSS', xml: 'XML', toml: 'TOML',
}

function CopyIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z" />
      <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z" />
    </svg>
  )
}

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" {...props}>
      <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.75.75 0 0 1 1.06-1.06L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z" />
    </svg>
  )
}

export function Fence({ children, language }) {
  const [copied, setCopied] = useState(false)
  const label = languageNames[language] || language

  const handleCopy = () => {
    copy(children.trimEnd())
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="not-prose group relative my-5 rounded-lg bg-slate-900 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10">
      {/* Header with language label and copy */}
      {language !== 'doc' && (
        <div className="flex items-center justify-between rounded-t-lg border-b border-slate-800 px-4 py-2 dark:border-slate-700/50">
          <span className="font-mono text-xs text-slate-400">{label}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-slate-500 transition-colors hover:text-slate-300"
          >
            {copied ? (
              <CheckIcon className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <CopyIcon className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      )}

      <Highlight
        code={children.trimEnd()}
        language={language}
        theme={{ plain: {}, styles: [] }}
      >
        {({ className, style, tokens, getTokenProps }) => (
          <pre className={`${className} overflow-x-auto p-4 text-[13px] leading-relaxed`} style={style}>
            <code>
              {tokens.map((line, lineIndex) => (
                <Fragment key={lineIndex}>
                  {line
                    .filter((token) => !token.empty)
                    .map((token, tokenIndex) => (
                      <span key={tokenIndex} {...getTokenProps({ token })} />
                    ))}
                  {'\n'}
                </Fragment>
              ))}
            </code>
          </pre>
        )}
      </Highlight>
    </div>
  )
}
