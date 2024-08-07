import vineetImage from '@/images/vineet_pp.jpg'
import praveenImage from '@/images/praveen_kumar.jpg'
import React, {useEffect} from "react";
import Image from "next/image";
import "../styles/carousel.css"

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
  const [visibleCardIndex, setVisibleCardIndex] = React.useState(0);
  const data = testimonialsData

  useEffect(()=>{
    let time = setInterval(()=>{
      setVisibleCardIndex(prev => {
        return (prev+1) % data.length
      })
    },1000*10)
    return ()=>{
      clearInterval(time)
    }
  },[visibleCardIndex])

  return (
      <div className={`flex justify-center overflow-visible px-2 py-5 flex-col gap-10 items-center w-full`}>
        <div className={`flex justify-center items-center text-center`}>
          <span className={`text-3xl font-semibold`}>Don't take our word for it. Take theirs</span>
        </div>
        <div className={`flex flex-col justify-between gap-5`}>
          <div
              key={data[visibleCardIndex].name}
              className="max-w-[500px] border-[1px] border-sky-600 rounded-2xl p-4"
              style={{
                boxShadow: "#348bb436 0px 0px 50px 0px"
              }}
          >
            <figure className="flex flex-auto flex-col justify-between">
              <blockquote className="text-lg leading-8 text-white text-center">
                <p>“{data[visibleCardIndex].content}”</p>
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-x-6">
                <Image
                    className="h-14 w-14 rounded-full bg-gray-800"
                    src={data[visibleCardIndex].profile}
                    width={400}
                    height={400}
                    alt="profile"
                />
                <div className="text-base">
                  <div className="font-semibold text-white">
                    {data[visibleCardIndex].name}
                  </div>
                  <div className="mt-1 text-gray-400">{data[visibleCardIndex].role}</div>
                </div>
              </figcaption>
            </figure>
          </div>
          <div className={`flex justify-center items-center gap-2`}>
            {
              Array.from({length: data.length}).map((_, index) => (
                  <div
                      className={`bg-slate-800 flex rounded-2xl p-1 ${index === visibleCardIndex ? "w-[100px]" : "w-[12px]"} `}
                      key={`carousel-${index}`} onClick={() => {
                    setVisibleCardIndex(index)
                  }}>
                                <span
                                    className={`w-full ${index === visibleCardIndex ? "activeCardTimer bg-white" : ""} h-[4px] rounded-2xl`}></span>
                  </div>
              ))
            }
          </div>
        </div>
      </div>
  );
}
