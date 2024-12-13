import BlogViewer from '@/components/Blogs/BlogViewer'
import { notFound } from 'next/navigation'

// Fetch blog data at build time (Static Site Generation)
async function fetchBlogData(slug) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}/blog-service/blog/${slug}`,
      {
        cache: 'force-cache',
      },
    )

    if (!res.ok) {
      return null
    }

    const data = await res.json()
    return data?.data
  } catch (error) {
    console.error('Error fetching blog data:', error)
    return null
  }
}

// Define paths that need to be pre-rendered at build time (SSG)
export async function generateStaticParams() {
  try {
    // Fallback: If the API is not available during build time,
    // return a dummy array to allow the build to complete
    if (!process.env.NEXT_PUBLIC_BLOG_BASE_URL) {
      return [{ slug: 'dummy-slug' }]
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BLOG_BASE_URL}/blog-service/blog`,
    )

    if (!res.ok) {
      // If API fails, return dummy data to allow build to complete
      return [{ slug: 'dummy-slug' }]
    }

    const data = await res.json()

    if (!data?.data || !Array.isArray(data.data) || data.data.length === 0) {
      // If no data, return dummy data to allow build to complete
      return [{ slug: 'dummy-slug' }]
    }

    // Filter out invalid slugs and ensure we have at least one valid slug
    const validSlugs = data.data
      .filter(
        (blog) => blog && typeof blog.slug === 'string' && blog.slug.length > 0,
      )
      .map((blog) => ({ slug: blog.slug }))

    return validSlugs.length > 0 ? validSlugs : [{ slug: 'dummy-slug' }]
  } catch (error) {
    console.error('Error in generateStaticParams:', error)
    // Return dummy data to allow build to complete
    return [{ slug: 'dummy-slug' }]
  }
}

// Specify dynamic segment configuration
export const dynamicParams = true

// Page component that renders the blog post
export default async function App({ params }) {
  const data = await fetchBlogData(params.slug)

  // If data is not found, show 404 page
  if (!data) {
    notFound()
  }

  return (
    <div className="flex items-center justify-center p-4 pb-10">
      <BlogViewer
        title={data.title}
        date={data.publishTime}
        coverImage={data?.imageURL?.imageUpload?.url}
        markdown={data.content}
      />
    </div>
  )
}
