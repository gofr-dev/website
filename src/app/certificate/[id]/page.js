'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'

function getData(id) {
  return fetch(`https://staging.gofr.dev/certificate-service/certificate/${id}`)
}

export default function CertificateRender() {
  const params = useParams()
  const [imgData, setImgData] = useState()

  useEffect(() => {
    getData(params.id)
      .then((res) => {
        if (!res.ok) {
          // This will activate the closest `error.js` Error Boundary
          throw new Error('Failed to fetch data')
        }
        return res.json()
      })
      .then((data) => {
        setImgData(data)
      })
      .catch((err) => {
        throw new Error(err)
      })
  }, [])

  // TO DO
  // const handleDownload = () => {
  //   fetch(imgData?.data?.url)
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok')
  //       }
  //       return response.blob()
  //     })
  //     .then((blob) => {
  //       const url = window.URL.createObjectURL(blob)
  //       setImageData(url)
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching image:', error)
  //     })
  // }

  return (
    <>
      {imgData?.data?.url && (
        <>
          {/* <button onClick={handleDownload}>Download Image</button> */}
          <Image
            className="mx-auto w-[90%] max-w-5xl"
            src={imgData?.data?.url}
            alt="certificate"
            height={600}
            width={800}
            unoptimized
            priority
          />
        </>
      )}
    </>
  )
}
