'use client'

import React, { useEffect, useRef, useState } from 'react'
import AnimateHeight from '@/components/AnimateHeight'
import ArrowRight from '@/images/icons8-arrow-white.png'
import Image from 'next/image'

const Accordion = ({ data }) => {
  return (
    <div className={`flex flex-col gap-4`}>
      {data.map((item, index) => (
        <AccordionCard data={item} key={index} />
      ))}
    </div>
  )
}

export default Accordion

const AccordionCard = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [height, setHeight] = useState(0)
  const [titleHeight, setTitleHeight] = useState(50)
  const titleRef = useRef(null)

  useEffect(() => {
    if (!titleRef.current) return

    const getTitleHeight = () => {
      const height = titleRef.current.getBoundingClientRect().height
      setTitleHeight(height + 35)
    }

    getTitleHeight()

    window.addEventListener('resize', getTitleHeight)

    return () => {
      window.removeEventListener('resize', getTitleHeight)
    }
  }, [titleRef.current])

  return (
    <div
      className={`group relative flex cursor-pointer flex-col gap-1 overflow-hidden rounded-md border border-slate-200 p-2 transition-all duration-500 dark:border-slate-800`}
      style={{
        height: titleHeight + height,
      }}
      onClick={() => {
        setIsOpen((prevState) => !prevState)
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-md border-2 border-transparent opacity-0 transition-opacity duration-500 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]"
        style={{ clipPath: 'inset(0 round var(--rounded-md))' }}
      />
      <div
        className="absolute inset-0 rounded-md transition-opacity duration-300"
        style={{
          background: isOpen
            ? 'linear-gradient(136deg, rgba(56, 189, 248, 1) 0%, rgb(129, 140, 248,1)50%, rgba(56, 189, 248, 1) 100%)'
            : 'transparent',
        }}
      />

      <div className="absolute inset-[1px] top-[1px] z-10 flex flex-col rounded-md bg-slate-900 p-4">
        <div className={`flex flex-col`}>
          <div className={`flex justify-between gap-2`}>
            <span ref={titleRef} className={`text-sm font-semibold md:text-xl`}>
              {data.title}
            </span>
            <button>
              <Image
                src={ArrowRight}
                alt={'arrow-right'}
                width={20}
                height={20}
                className={`transition-all duration-500 ${
                  isOpen ? 'rotate-90' : ''
                }`}
                unoptimized
              />
            </button>
          </div>
          <AnimateHeight
            onChange={(w) => {
              setHeight(w)
            }}
            customAnimation={'duration-300'}
          >
            {isOpen && (
              <span className={`pt-4 text-xs text-gray-400 md:text-sm`}>
                {data.description}
              </span>
            )}
          </AnimateHeight>
        </div>
      </div>
    </div>
  )
}
