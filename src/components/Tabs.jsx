'use client'

import { useState, Children, isValidElement } from 'react'
import clsx from 'clsx'

export function Tabs({ children, labels = [] }) {
  const tabs = []
  Children.forEach(children, (child) => {
    if (isValidElement(child)) {
      tabs.push(child)
    }
  })

  const tabLabels = labels.length > 0
    ? labels
    : tabs.map((tab, i) => tab.props?.label || `Tab ${i + 1}`)

  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <div className="my-6 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
      <div className="flex border-b border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800/50">
        {tabLabels.map((label, i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={clsx(
              'px-4 py-2.5 text-sm font-medium transition-colors',
              i === activeIndex
                ? 'border-b-2 border-sky-500 text-sky-600 dark:text-sky-400'
                : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300',
            )}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tabs[activeIndex]}
      </div>
    </div>
  )
}

export function Tab({ children }) {
  return <div>{children}</div>
}
