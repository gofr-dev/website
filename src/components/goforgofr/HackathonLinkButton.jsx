'use client'

const { default: Link } = require('next/link')
const { usePathname } = require('next/navigation')

export const HackathonLinkButton = () => {
  const pathName = usePathname()
  if (pathName === '/hackathon') {
    return null
  }

  return (
    <div className="left-0 right-0 top-0 z-50 bg-black px-4 py-1 sm:fixed">
      <div className="relative z-30 flex items-center justify-center text-center text-white">
        <span className="bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-sm font-semibold text-transparent md:text-sm">
          🚀 GoFr Summer of Code 2025 is Live. Register Now !
        </span>
        <Link
          href="https://unstop.com/hackathons/gofr-summer-of-code-gofrdev-1488007"
          className="group relative flex flex-col items-center gap-1 px-2 text-xs md:text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="flex items-center gap-1 ">
            <span className="whitespace-nowrap bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-transparent transition-colors duration-300">
              Join Now
            </span>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative"
            >
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="100%" y2="0">
                  <stop offset="0%" stopColor="#c3dafe" />
                  <stop offset="50%" stopColor="#38bdf8" />
                  <stop offset="100%" stopColor="#c3dafe" />
                </linearGradient>
              </defs>
              <path
                d="M4 12h16m-6-6l6 6-6 6"
                stroke="url(#gradient)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="absolute inset-x-0 bottom-0 h-0.5 scale-x-0 bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 transition-transform duration-300 group-hover:scale-x-90" />
        </Link>
      </div>
    </div>
  )
}
