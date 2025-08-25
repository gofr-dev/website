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
      <div className="sm:px-2 lg:relative lg:px-0 lg:py-20">
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
                <h1 className="inline bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text font-display text-5xl tracking-tight text-transparent">
                  An Opinionated Go Framework
                </h1>
                <h2 className="mt-3 text-2xl tracking-tight text-slate-400">
                  For accelerated microservice development
                </h2>
                <div className="mt-9 flex justify-center gap-4 xl:justify-start">
                  <Link
                    className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sky-400 to-blue-500 px-6 py-3 text-base font-bold text-white shadow-lg shadow-sky-500/25 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-sky-500/40 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400 active:scale-95"
                    href="/docs"
                  >
                    <span>Get Started</span>
                    <svg
                      className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                  <Link
                    className="flex items-center gap-1 rounded-full bg-white bg-opacity-[0.08] px-4 py-1 text-sm font-semibold text-white transition-all duration-200 hover:bg-opacity-[.15]"
                    href="https://github.com/gofr-dev/gofr"
                    target="_blank"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 16 16"
                      className="mr-1 h-5 w-5 fill-slate-400 group-hover:fill-slate-500 dark:group-hover:fill-slate-300"
                    >
                      <path d="M8 0C3.58 0 0 3.58 0 8C0 11.54 2.29 14.53 5.47 15.59C5.87 15.66 6.02 15.42 6.02 15.21C6.02 15.02 6.01 14.39 6.01 13.72C4 14.09 3.48 13.23 3.32 12.78C3.23 12.55 2.84 11.84 2.5 11.65C2.22 11.5 1.82 11.13 2.49 11.12C3.12 11.11 3.57 11.7 3.72 11.94C4.44 13.15 5.59 12.81 6.05 12.6C6.12 12.08 6.33 11.73 6.56 11.53C4.78 11.33 2.92 10.64 2.92 7.58C2.92 6.71 3.23 5.99 3.74 5.43C3.66 5.23 3.38 4.41 3.82 3.31C3.82 3.31 4.49 3.1 6.02 4.13C6.66 3.95 7.34 3.86 8.02 3.86C8.7 3.86 9.38 3.95 10.02 4.13C11.55 3.09 12.22 3.31 12.22 3.31C12.66 4.41 12.38 5.23 12.3 5.43C12.81 5.99 13.12 6.7 13.12 7.58C13.12 10.65 11.25 11.33 9.47 11.53C9.76 11.78 10.01 12.26 10.01 13.01C10.01 14.08 10 14.94 10 15.21C10 15.42 10.15 15.67 10.55 15.59C13.71 14.53 16 11.53 16 8C16 3.58 12.42 0 8 0Z"></path>
                    </svg>
                    <span>View on GitHub</span>
                  </Link>
                </div>
                <div
                  className={`flex flex-wrap justify-center gap-x-1 pt-5 text-sm text-slate-400 xl:justify-start`}
                >
                  <span>Want to evaluate and adopt GoFr at your org?</span>
                  <Link
                    href={
                      'https://calendly.com/aryan-mehrotra-gofr/30min?month=2024-10'
                    }
                    target={'_blank'}
                    className={`text-sky-400`}
                  >
                    {' '}
                    Block our calendar.
                  </Link>
                </div>
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
