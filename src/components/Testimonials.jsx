import Image from 'next/image'
import vineetImage from '@/images/vineet_pp.jpg'
import praveenImage from '@/images/praveen_kumar.jpg'

const testimonialsData = [
  {
    name: 'Praveen Kumar',
    role: 'Founder of apnerve labs',
    profile: praveenImage,
    content:
      'What I like about GoFr is that it plays well with the standard CI/CD infrastructure, deployment environment, and every additional tool in between. Also, it solves for the 80% cases, thus, ensuring we only focus on our core business',
  },
  {
    name: 'Vineet Dwivedi',
    role: 'Founder & CEO at LaunchX',
    profile: vineetImage,
    content:
      "The strong opinions embedded in GoFr.dev make it incredibly efficient and straightforward to work with. It's like having a trusted expert guiding your every move. The framework's Golang foundation ensures exceptional performance and reliability. If you're serious about microservices, this is a must-try",
  },
]

export function Testimonials() {
  return (
    <>
      {testimonialsData.map(({ name, profile, content, role }, i) => (
        <div
          className="mt-4 flex flex-col justify-between rounded-xl border border-slate-200 px-10 py-6 leading-snug text-gray-700 shadow dark:border-slate-800 sm:w-full md:w-[calc(49%)] lg:w-[calc(49%)]  xl:w-[calc(49%)]"
          key={i}
        >
          <div>
            <div className="-ml-4">
              <svg
                className="w-8 text-sky-400 "
                xmlns="http://www.w3.org/2000/svg"
                shapeRendering="geometricPrecision"
                textRendering="geometricPrecision"
                imageRendering="optimizeQuality"
                fillRule="evenodd"
                clipRule="evenodd"
                viewBox="0 0 640 640"
                fill="currentColor"
              >
                <path d="M557.133 561.704H442.128c-44.256 0-80.458-36.19-80.458-80.446 0-165.58-42.32-347.485 160.656-399.418 91.95-23.516 115.915 77.753 18.119 84.745-59.647 4.276-71.293 42.804-73.147 101.068h92.269c44.256 0 80.458 36.201 80.458 80.458v130.702c0 45.591-37.3 82.89-82.891 82.89zm-358.032 0H84.096c-44.256 0-80.446-36.19-80.446-80.446 0-165.58-42.331-347.485 160.644-399.418 91.95-23.516 115.915 77.753 18.118 84.745-59.646 4.276-71.292 42.804-73.146 101.068h92.269c44.256 0 80.457 36.201 80.457 80.458v130.702c0 45.591-37.3 82.89-82.89 82.89z" />
              </svg>
            </div>
            <div className="mt-2 font-display text-base text-slate-900 dark:text-slate-400">
              {content}
            </div>
          </div>
          <div>
            <div className="borde mx-auto my-8 w-full" />
            <div className="flex items-center">
              <div>
                <Image
                  height={400}
                  width={400}
                  className="h-14 w-14 rounded-full border-2 border-sky-400"
                  src={profile}
                  alt={name}
                />
              </div>
              <div className="ml-4">
                <div className="font-bold dark:text-slate-200">{name}</div>
                <div className="mt-1 text-sm dark:text-slate-500">{role}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
