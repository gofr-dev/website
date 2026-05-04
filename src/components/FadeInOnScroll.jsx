'use client'

import { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

// Bidirectional IntersectionObserver fade. A section fades up + in
// when it scrolls into view and fades back out when it leaves —
// so as you scroll the page the active section is always the one
// at full opacity, and adjacent sections feel like they're breathing.
//
// Implementation:
// - keep observing (no unobserve) so the fade reverses on scroll-back
// - threshold ~15% of section visible counts as "in view"
// - rootMargin shrinks the trigger zone so a tall section's edges
//   fade rather than the entire section flipping at the very top edge
//
// Avoided framer-motion (~40 kB gz) for what is two CSS transitions.
// Honors `prefers-reduced-motion` (renders fully visible, no anim).
export function FadeInOnScroll({ children, className }) {
  const ref = useRef(null)
  // Default to `true` so SSR markup is fully visible — JS then takes
  // over once hydrated. If JS never runs, page still reads correctly.
  const [shown, setShown] = useState(true)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    if (reduce) return // already shown=true
    const node = ref.current
    if (!node) return
    // Start hidden post-hydration; observer will reveal on entry.
    setShown(false)
    const obs = new IntersectionObserver(
      ([entry]) => setShown(entry.isIntersecting),
      { threshold: 0.15, rootMargin: '-5% 0px -5% 0px' },
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={clsx(
        'transition-all duration-700 ease-out',
        shown ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className,
      )}
    >
      {children}
    </div>
  )
}
