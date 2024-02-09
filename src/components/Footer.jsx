import React from 'react'
import cloudNativeLandscapeSvg from '@/images/cloud-native-landscape.svg'
import awesomeGo from '@/images/awesome-go.svg'
import Image from 'next/image'
function FooterUi() {
  return (
    <footer className="border-t border-slate-800 px-12 pb-4 pt-4 dark:bg-slate-900">
      <div className="flex w-full flex-col">
        <div className="mb-4 flex flex-col items-baseline justify-between md:flex-row">
          <div className="flex-1">
            <h2 className="mb-5 text-base font-semibold capitalize text-gray-900 dark:text-white">
              Web Links
            </h2>
            <ul className="text-sm font-medium text-gray-500 dark:text-gray-400">
              <li>
                <a
                  href="https://landscape.cncf.io/?selected=go-fr"
                  className="flex h-12 w-28 hover:text-sky-200"
                  target="_blank"
                >
                  <div className="dark:bg-slate-900">
                    <Image
                      src={cloudNativeLandscapeSvg}
                      alt="cloudNativeLandscape"
                      className="h-full w-full"
                    />
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/avelino/awesome-go?tab=readme-ov-file#web-frameworks"
                  className="flex h-12 w-28 hover:text-sky-200"
                  target="_blank"
                >
                  <div className="dark:bg-slate-900">
                    <Image
                      src={awesomeGo}
                      alt="cloudNativeLandscape"
                      className="h-full w-full"
                    />
                  </div>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h2 className="mb-5 text-base font-semibold capitalize text-gray-900 dark:text-white">
              Community
            </h2>
            <ul className="text-sm font-medium text-slate-700 dark:text-slate-400">
              <li className="mb-3">
                <a
                  href="https://github.com/gofr-dev/gofr/discussions"
                  target="_blank"
                  className="hover:text-slate-300"
                >
                  Github
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <span className="text-xs text-gray-500 dark:text-gray-300 sm:text-center">
            © 2023 <span>GoFr</span>. All Rights Reserved.
          </span>
        </div>
      </div>
    </footer>
  )
}

export default FooterUi
