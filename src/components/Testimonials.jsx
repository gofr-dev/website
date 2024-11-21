import Image from 'next/image'

import vineetImage from '@/images/vineet_pp.jpg'
import praveenImage from '@/images/praveen_kumar.jpg'
import { useEffect, useState } from 'react'

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
      {testimonialsData.map((testimonial) => (
        <div
          key={testimonial.name}
          className="flex min-w-[calc(100%-5rem)] flex-col sm:mb-14 md:min-w-[calc(50%-1rem)] xl:min-w-[calc(50%-2rem)] "
        >
          <figure className="flex flex-auto flex-col justify-between">
            <blockquote className="text-lg leading-8 text-white">
              <p>“{testimonial.content}”</p>
            </blockquote>
            <figcaption className="mt-10 flex items-center gap-x-6">
              <Image
                className="h-14 w-14 rounded-full bg-gray-800"
                src={testimonial.profile}
                width={400}
                height={400}
                alt="profile"
                unoptimized
              />
              <div className="text-base">
                <div className="font-semibold text-white">
                  {testimonial.name}
                </div>
                <div className="mt-1 text-gray-400">{testimonial.role}</div>
              </div>
            </figcaption>
          </figure>
        </div>
      ))}
    </>
  )
}
