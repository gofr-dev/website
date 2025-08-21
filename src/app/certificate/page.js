'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import NotFound from '@/app/not-found'

export default function Certificate() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [certificateUrl, setCertificateUrl] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    async function fetchCertificate() {
      try {
        const response = await fetch(
          `https://gofr.dev/certificate-service/certificate/${id}`,
        )
        const { data } = await response.json()
        setCertificateUrl(data.url)
      } catch (err) {
        setError(true)
      }
    }

    if (id) fetchCertificate()
  }, [id])

  if (error) return <NotFound />
  if (!certificateUrl)
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#38bdf9]" />
      </div>
    )

  return (
    <Image
      className="mx-auto w-[90%] max-w-5xl"
      src={certificateUrl}
      alt="certificate"
      height={600}
      width={800}
      unoptimized
      priority
    />
  )
}
