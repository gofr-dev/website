import { formatGitHubStars } from '../../utils'
import company1 from '@/images/logo1.svg'
import company2 from '@/images/logo2.svg'
import company3 from '@/images/logo3.svg'
import company4 from '@/images/logo4.svg'
import company5 from '@/images/logo5.svg'
import company6 from '@/images/logo6.svg'
import company8 from '@/images/logo8.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const imageLink = [
  {
    image: company2,
  },
  {
    image: company3,
  },
  {
    image: company6,
  },
  {
    image: company8,
  },
  {
    image: company1,
  },
  {
    image: company4,
  },
  {
    image: company5,
  },
]

export default function CompanyList() {
  const [githubStars, setGithubStars] = useState('3500+')

  useEffect(() => {
    setGithubStars(formatGitHubStars('githubStars'))
  }, [])
  return (
    <div className="bg-gray-900 py-16 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg/8 font-semibold text-white">
          Trusted by {githubStars} Developers at Companies Like:
        </h2>
        <div className="mt-10 flex flex-wrap justify-center gap-x-0 gap-y-10 sm:max-w-none lg:mx-0">
          {imageLink.map((item, index) => (
            <div
              key={index}
              className="flex max-h-12 w-1/4 justify-center sm:w-1/6 lg:w-1/5"
            >
              <Image
                alt="Transistor"
                src={item.image}
                width={158}
                height={48}
                className="max-h-12 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
