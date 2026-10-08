'use client'

import { useEffect, useRef, useState } from 'react'

// Counts up from 0 → `value` over `durationMs` once the element scrolls
// into view. Eases out (cubic) so the count slows toward the final
// number rather than stopping abruptly.
//
// The server-rendered HTML (and the first client render) already contains
// the final `value`, so crawlers and tools that do not run JavaScript read
// the real number. The count only restarts from 0 in the browser when the
// element scrolls into view.
//
// `format` is called with the current number to render the displayed
// string (e.g. add a "+" or commas). Defaults to localized integer.
//
// Honors `prefers-reduced-motion` — keeps the final number with no
// animation.
export function CountUp({ value, durationMs = 1500, format }) {
  const ref = useRef(null)
  const [n, setN] = useState(value)
  const formatFn = format || ((x) => x.toLocaleString())

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const node = ref.current
    if (!node) return
    let raf = 0
    let started = false
    const start = (t0) => {
      const tick = (now) => {
        const elapsed = now - t0
        const progress = Math.min(1, elapsed / durationMs)
        // ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setN(Math.round(value * eased))
        if (progress < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true
          setN(0)
          start(performance.now())
          obs.unobserve(node)
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(node)
    return () => {
      obs.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [value, durationMs])

  return <span ref={ref}>{formatFn(n)}</span>
}
