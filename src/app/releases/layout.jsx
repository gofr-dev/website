'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const Layout = ({ children }) => {
  const router = useRouter()

  useEffect(() => {
    router.replace('/changelog')
  }, [router])

  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <p className="text-slate-500">
        Redirecting to changelog...
      </p>
    </div>
  )
}

export default Layout
