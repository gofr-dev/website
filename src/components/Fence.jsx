'use client'
import { Fragment, useState } from 'react'
import { Highlight, Prism } from 'prism-react-renderer'
import bashLang from 'refractor/lang/bash'
import FileCopyIcon from '@mui/icons-material/FileCopy'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'
import copy from 'copy-to-clipboard'
import Tooltip from '@mui/material/Tooltip'

bashLang(Prism)

export function Fence({ children, language }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    copy(children.trimEnd())
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 1500)
  }

  return (
    <div>
      <Highlight
        code={children.trimEnd()}
        language={language}
        theme={{
          plain: {},
          styles: [],
        }}
      >
        {({ className, style, tokens, getTokenProps }) => (
          <pre className={`${className} flex`} style={style}>
            <code style={{ width: 'calc(100% - 24px)', overflow: 'auto' }}>
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
            {language !== 'doc' && (
              <div>
                {copied ? (
                  <Tooltip title="Copied!">
                    <DoneOutlinedIcon className="h-6 w-6 text-xs text-green-500 transition duration-500 ease-in-out" />
                  </Tooltip>
                ) : (
                  <Tooltip title="Copy">
                    <FileCopyIcon
                      className={`h-6 w-6 cursor-pointer text-xs text-gray-500 transition duration-500 ease-in-out`}
                      onClick={handleCopy}
                    />
                  </Tooltip>
                )}
              </div>
            )}
          </pre>
        )}
      </Highlight>
    </div>
  )
}
