'use client'

import React from 'react'
import { formatBlogDate, formatMD } from '@/lib/common'
import dynamic from 'next/dynamic'
import './blogViewerStyle.scss'

// import Image from 'next/image';

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default.Markdown),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  },
)

const BlogViewer = ({ title, date, coverImage, markdown }) => {
  return (
    <div
      className={`blogViewer flex w-full max-w-3xl flex-col items-center p-2`}
      // data-color-mode="light"
    >
      <div className={`w-full text-gray-900`}>
        <h1 className={``}>{title}</h1>
      </div>
      <div className={`w-full text-gray-600`}>
        {date ? formatBlogDate(date) : ''}
      </div>
      {coverImage && (
        <img
          src={coverImage}
          className={`mt-3 rounded-xl`}
          alt={'cover image'}
          height={1000}
          width={1000}
        />
      )}
      <div className="markdown-editor">
        <MDEditor
          source={formatMD(markdown)}
          style={{ whiteSpace: 'pre-wrap', backgroundColor: 'transparent' }}
          className={`contentHolder w-full`}
        />
      </div>
    </div>
  )
}

export default BlogViewer
