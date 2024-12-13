import React from 'react'

import PropTypes from 'prop-types'
import Link from 'next/link'
import { UserCircleIcon } from '@heroicons/react/20/solid'
import EmptyBlogPage from '../icons/EmptyBlogPage'
// import Image from 'next/image';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function BlogList({
  title,
  subtitle,
  posts = [],
  variants = 'grid-image',
  orientation = 'row',
}) {
  // const containerClasses = classNames(
  //   'bg-white py-2 sm:py-4 w-full ',
  //   orientation === 'column' ? 'max-w-2xl lg:max-w-4xl' : 'max-w-7xl',
  // );

  const headerClasses = classNames(
    'text-balance font-semibold tracking-tight text-gray-900 text-5xl m-2',
    orientation !== 'column' && 'text-center',
  )

  const gridClasses = classNames(
    orientation === 'column'
      ? 'mt-10 flex flex-col gap-10 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-10'
      : 'mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3',
    variants === 'grid-text' && 'border-t border-gray-200',
  )

  return posts.length > 0 ? (
    <div className=" py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className=" text-primary-600 text-center text-base/7 font-semibold">
            Blogs
          </h2>
          <h2 className={headerClasses}>{title}</h2>

          {subtitle && (
            <p
              className={classNames(
                orientation === 'row'
                  ? 'mt-2 text-center text-lg/8 text-gray-600'
                  : 'mt-2 text-lg/8 text-gray-600',
              )}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div className={gridClasses}>
          {posts?.map((post, idx) => (
            <Link href={`/blogs${post.href}`} key={idx} className={`pb-10`}>
              <article
                className={classNames(
                  variants === 'grid-image' && orientation === 'column'
                    ? 'relative isolate flex flex-col sm:gap-4 md:gap-8 lg:flex-row'
                    : 'flex flex-col items-start justify-between',
                )}
              >
                {variants === 'grid-image' && (
                  <div
                    className={classNames(
                      orientation === 'column'
                        ? 'relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0'
                        : 'relative w-full',
                    )}
                  >
                    <img
                      alt={post.title}
                      src={
                        post.imageUrl ??
                        'https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80'
                      }
                      className={classNames(
                        orientation === 'column'
                          ? 'absolute inset-0 h-full w-full rounded-2xl bg-gray-50 object-cover'
                          : 'aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]',
                      )}
                      height={1000}
                      width={1000}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                )}
                <div className="max-w-xl">
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time dateTime={post.datetime} className="text-gray-500">
                      {post.date}
                    </time>
                    {post.category.map((categoryItem, idx) => (
                      <div
                        key={idx}
                        className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                      >
                        {categoryItem}
                      </div>
                    ))}
                  </div>
                  <div className="group relative">
                    <h3 className="mt-3 text-lg/6 font-semibold text-white group-hover:text-white">
                      <span className="absolute inset-0" />
                      {post.title}
                    </h3>
                    <p className="mt-5 line-clamp-3 text-sm/6 text-gray-600">
                      {post.description}
                    </p>
                  </div>
                  <div className="relative mt-8 flex items-center gap-x-4">
                    {post.author.imageUrl ? (
                      <img
                        alt={post.author.name}
                        src={post.author.imageUrl}
                        className="h-10 w-10 rounded-full bg-gray-100"
                        height={1000}
                        width={1000}
                        loading="lazy"
                      />
                    ) : (
                      <UserCircleIcon className="h-10 w-10 fill-gray-100" />
                    )}
                    <div className="text-sm/6">
                      <p className="font-semibold text-gray-900">
                        <span className="absolute inset-0" />
                        {post.author.name}
                      </p>
                      <p className="text-gray-600">{post.author.role}</p>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-6 text-center md:min-h-[72vh]">
      <EmptyBlogPage height={200} width={200} />
      <div className="mt-6 max-w-lg space-y-4">
        <h2 className="text-2xl font-semibold text-gray-900">
          We’re just getting started...
        </h2>
        <p className="text-gray-600">
          Looks like our blog is empty for now. But don’t worry, we’ll be
          filling it up with awesome stories, tips, and ideas shortly.
        </p>
      </div>
    </div>
  )
}

BlogList.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      datetime: PropTypes.string.isRequired,
      category: PropTypes.arrayOf(PropTypes.string).isRequired,
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        role: PropTypes.string.isRequired,
        href: PropTypes.string.isRequired,
        imageUrl: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  variants: PropTypes.oneOf(['grid-image', 'grid-text']),
  orientation: PropTypes.oneOf(['row', 'column']),
}

// ImageGrid.defaultProps = {
//   subtitle: "",
//   variants: "grid-image",
//   orientation: "row",
// };
