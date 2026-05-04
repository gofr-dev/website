'use client'

import { useEffect, useRef, useState } from 'react'

// Counts up from 0 → `value` over `durationMs` once the element scrolls
// into view. Eases out (cubic) so the count slows toward the final
// number rather than stopping abruptly.
//
// `format` is called with the current number to render the displayed
// string (e.g. add a "+" or commas). Defaults to localized integer.
//
// Honors `prefers-reduced-motion` — renders the final number
// immediately with no animation.
export function CountUp({ value, durationMs = 1500, format }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)
  const formatFn = format || ((x) => x.toLocaleString())

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setN(value)
      return
    }
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
