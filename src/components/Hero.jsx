import { Fragment, useState } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import { Highlight } from 'prism-react-renderer'

import completeGofrLogo from '@/images/complete-gorg-logo.svg'
import { HeroBackground } from '@/components/HeroBackground'
import blurCyanImage from '@/images/blur-cyan.png'
import blurIndigoImage from '@/images/blur-indigo.png'
import Link from 'next/link'

const codeLanguage = 'javascript'
const mainGoCode = `package main

import "gofr.dev/pkg/gofr"

func main() {
    app := gofr.New()

    app.GET("/hello", func(c *gofr.Context) (interface{}, error) {
		return "Hello GoFr!", nil
	})

    app.Run()
}`

const mainTestGoCode = `package main

import (
    "encoding/json"
    "io"
    "net/http"
    "testing"
    "time"

    "github.com/stretchr/testify/assert"
    "github.com/stretchr/testify/require"
)

func TestIntegration_SimpleAPIServer(t *testing.T) {
    go main()

    time.Sleep(time.Second * 1) // Giving some time to start the server

    tests := []struct {
        desc       string
        path       string
        statusCode int
        body       interface{}
    }{
        {"hello handler", "/hello", http.StatusOK, "Hello World!"},
        {"hello error", "/unknown", http.StatusNotFound, nil},
    }

    for i, tc := range tests {
        req, _ := http.NewRequest(http.MethodGet,
        "http://localhost:8000"+tc.path, nil)
        req.Header.Set("content-type", "application/json")

        c := http.Client{}
        resp, err := c.Do(req)

        var data = struct {
            Data interface{} \`json:"data\`
        }{}

        b, err := io.ReadAll(resp.Body)
        require.NoError(t, err)

        _ = json.Unmarshal(b, &data)

        assert.Equal(t, tc.body, data.Data)
        assert.Equal(t, tc.statusCode, resp.StatusCode)

        resp.Body.Close()
    }
}
`

const tabs = [
  { name: 'main.go', isActive: true },
  { name: 'main_test.go', isActive: false },
]

function TrafficLightsIcon(props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 42 10" fill="none" {...props}>
      <circle cx="5" cy="5" r="4.5" />
      <circle cx="21" cy="5" r="4.5" />
      <circle cx="37" cy="5" r="4.5" />
    </svg>
  )
}

export function Hero() {
  const [activeTab, setActiveTab] = useState('main.go')
  const code = activeTab === 'main.go' ? mainGoCode : mainTestGoCode

  return (
    <div className="overflow-hidden bg-slate-900 dark:-mb-32 dark:mt-[-4.75rem] dark:pb-32 dark:pt-[4.75rem]">
      <div className="sm:px-2 lg:relative lg:px-0 lg:py-16 lg:py-20">
        <div className="x:px-12 mr-auto grid grid-cols-1 items-center gap-x-8 gap-y-16 px-4 lg:max-w-[100%] lg:grid-cols-2 lg:px-8 xl:gap-x-16">
          <div className="flex flex-col items-center gap-x-8 xl:flex-row xl:gap-x-16">
            <Image
              src={completeGofrLogo}
              alt="gofrLogo"
              height={150}
              unoptimized
              priority
            />
            <div className="relative z-10">
              <Image
                className="absolute bottom-full right-full -mb-56 -mr-72 opacity-50"
                src={blurCyanImage}
                alt=""
                width={530}
                height={530}
                unoptimized
                priority
              />
              <div className="relative text-center xl:text-left">
                <p className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                  An Opinionated Go Framework
                </p>
                <p className="mt-3 text-2xl tracking-tight text-slate-400">
                  For accelerated microservice development
                </p>
                {
                  <div className="mt-10">
                    <Link
                      className="rounded-full bg-sky-300 px-4 py-3 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500"
                      href="/docs"
                    >
                      Get Started
                    </Link>
                  </div>
                }
              </div>
            </div>
          </div>
          <div className="relative lg:static xl:pl-10">
            <div className="absolute inset-x-[-50vw] -bottom-48 -top-32 [mask-image:linear-gradient(transparent,white,white)] dark:[mask-image:linear-gradient(transparent,white,transparent)] lg:-bottom-32 lg:-top-32 lg:left-[calc(50%+14rem)] lg:right-0 lg:[mask-image:none] lg:dark:[mask-image:linear-gradient(white,white,transparent)]">
              <HeroBackground className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 lg:left-0 lg:translate-x-0 lg:translate-y-[-60%]" />
            </div>
            <div className="relative">
              <Image
                className="absolute -right-2 -top-64"
                src={blurCyanImage}
                alt=""
                width={530}
                height={530}
                unoptimized
                priority
              />
              <Image
                className="absolute -bottom-40 -right-1"
                src={blurIndigoImage}
                alt=""
                width={567}
                height={567}
                unoptimized
                priority
              />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10 blur-lg" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-sky-300 via-sky-300/70 to-blue-300 opacity-10" />
              <div className="relative rounded-2xl bg-[#0A101F]/80 ring-1 ring-white/10 backdrop-blur">
                <div className="absolute -top-px left-20 right-11 h-px bg-gradient-to-r from-sky-300/0 via-sky-300/70 to-sky-300/0" />
                <div className="absolute -bottom-px left-11 right-20 h-px bg-gradient-to-r from-blue-400/0 via-blue-400 to-blue-400/0" />
                <div className="pb-6 pl-4 pr-4 pt-4">
                  <TrafficLightsIcon className="h-2.5 w-auto stroke-slate-500/30" />
                  <div className="mt-4 flex space-x-2 text-xs">
                    {tabs.map((tab) => (
                      <div
                        key={tab.name}
                        className={clsx(
                          'flex h-6 cursor-pointer rounded-full',
                          tab.name === activeTab
                            ? 'bg-gradient-to-r from-sky-400/30 via-sky-400 to-sky-400/30 p-px font-medium text-sky-300'
                            : 'text-slate-500',
                        )}
                        onClick={() => setActiveTab(tab.name)}
                      >
                        <div
                          className={clsx(
                            'flex items-center rounded-full px-2.5',
                            tab.name === activeTab && 'bg-slate-800',
                          )}
                        >
                          {tab.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className={`mt-6 flex max-h-[315px] items-start px-1 px-4 text-sm ${
                      activeTab === 'main_test.go' ? 'overflow-auto' : ''
                    }`}
                  >
                    <div
                      aria-hidden="true"
                      className="select-none border-r border-slate-300/5 pr-4 font-mono text-slate-600"
                    >
                      {Array.from({
                        length: code.split('\n').length,
                      }).map((_, index) => (
                        <Fragment key={index}>
                          {(index + 1).toString().padStart(2, '0')}
                          <br />
                        </Fragment>
                      ))}
                    </div>
                    <Highlight
                      code={code}
                      language={codeLanguage}
                      theme={{ plain: {}, styles: [] }}
                    >
                      {({
                        className,
                        style,
                        tokens,
                        getLineProps,
                        getTokenProps,
                      }) => (
                        <pre
                          className={clsx(
                            className,
                            'flex overflow-x-auto pb-6',
                          )}
                          style={style}
                        >
                          <code className="px-4">
                            {tokens.map((line, lineIndex) => (
                              <div key={lineIndex} {...getLineProps({ line })}>
                                {line.map((token, tokenIndex) => (
                                  <span
                                    key={tokenIndex}
                                    {...getTokenProps({ token })}
                                  />
                                ))}
                              </div>
                            ))}
                          </code>
                        </pre>
                      )}
                    </Highlight>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
