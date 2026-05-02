'use client'

import { Children, cloneElement, isValidElement, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

// Container that fades each direct child in sequence (left→right or
// top→bottom by source order) once 15% of the container scrolls into
// view. Each child gets a `transition-delay: i * stepMs` via inline
// style; no per-child observer overhead.
//
// Children must accept className/style passthrough (most JSX elements
// do; cards in this project all do). For arbitrary children, the
// component still works — they just don't get the fade.
//
// Honors `prefers-reduced-motion` (renders fully visible, no anim).
export function StaggerChildren({ children, className, stepMs = 90 }) {
  const ref = useRef(null)
  const [shown, setShown] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return // already shown
    const node = ref.current
    if (!node) return
    setShown(false)
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          obs.unobserve(node)
        }
      },
      { threshold: 0.15 },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div ref={ref} className={className}>
      {Children.map(children, (child, i) => {
        if (!isValidElement(child)) return child
        const delay = `${i * stepMs}ms`
        const existingClass = child.props.className || ''
        const existingStyle = child.props.style || {}
        return cloneElement(child, {
          className: clsx(
            existingClass,
            'transition-all duration-700 ease-out',
            shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
          ),
          style: { ...existingStyle, transitionDelay: delay },
        })
      })}
    </div>
  )
}
