'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

// Client-side automatic language redirect. Static export prohibits
// reading IP / geo headers at request time, so we use the browser's
// `navigator.language` to redirect from `/` to a matching localized
// landing on first visit. Once the user clicks any language switcher in
// the footer, `gofr-lang-pref=manual` is set in localStorage and the
// auto-redirect never fires again.
const LANG_TO_PATH = {
  zh: '/zh',
  es: '/es',
}

export function LocaleAutoRedirect() {
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (pathname !== '/') return

    let pref
    try {
      pref = localStorage.getItem('gofr-lang-pref')
    } catch {
      // localStorage unavailable; treat as no preference.
    }
    if (pref === 'manual') return

    const browserLang = (navigator.language || 'en').toLowerCase()
    const primary = browserLang.split('-')[0]
    const target = LANG_TO_PATH[primary]
    if (!target) return

    router.replace(target)
  }, [pathname, router])

  return null
}
