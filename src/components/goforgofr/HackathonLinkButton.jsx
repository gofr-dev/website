'use client'

const { default: Link } = require("next/link");
const { usePathname } = require("next/navigation");

export const HackathonLinkButton = () => {
    const pathName = usePathname();
    if (pathName === '/hackathon') {
        return null;
    }

    return (
        <div className="sm:fixed top-0 left-0 right-0 z-50 bg-black py-1 px-4">
            <div className="relative z-30 flex items-center justify-center text-center text-white">
                <span className="text-sm font-semibold md:text-sm bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-transparent">
                    Go for GoFr Hackathon is Live! Participate to win great prizes and goodies!
                </span>
                <Link
                    href="/hackathon"
                    className="text-xs md:text-xs px-2 flex flex-col items-center gap-1 relative group"
                >
                    <div className="flex items-center gap-1 ">
                        <span className="bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 bg-clip-text text-transparent transition-colors duration-300 whitespace-nowrap">
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
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-indigo-200 via-sky-400 to-indigo-200 transition-transform duration-300 scale-x-0 group-hover:scale-x-90" />
                </Link>
            </div>
        </div>
    );
}
