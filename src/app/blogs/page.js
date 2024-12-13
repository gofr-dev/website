// app/blogs/page.js (or .tsx)

import React from 'react'
import { blogListTransformer } from '@/lib/transformer'
import BlogList from '@/components/Blogs/BlogList'

// This is your SSG with static data fetching inside the App Directory
const Blogs = async () => {
  // Fetch data directly here
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}/blog-service/blog`,
    {
      cache: 'force-cache', // Cache the data statically
    },
  )

  const data = await res.json()
  const posts = blogListTransformer(data?.data || [])

  return (
    <div className="flex w-full justify-center">
      <BlogList
        title="Explore Our Blogs"
        subtitle="Expert Tips and Guides for Seamless Cloud Management"
        posts={posts}
        variants="grid-image"
        orientation="row"
      />
    </div>
  )
}

export default Blogs
