import Link from 'next/link'
import React from 'react'
import clickHouse from '@/images/clickHouse.svg'
import ftp from '@/images/ftp.svg'
import redis from '@/images/redis.svg'
import mongoDb from '@/images/mongoDb.svg'
import pubSub from '@/images/pubSub.svg'
import kafka from '@/images/kafka.svg'
import sql from '@/images/sql.svg'
import mqtt from '@/images/mqtt.svg'
import Badger from '@/images/Badger.svg'
import cassandra from '@/images/cassandra.svg'
import Image from 'next/image'

const imageLink = [
  {
    image: ftp,
    link: '/docs/advanced-guide/handling-file',
  },
  {
    image: clickHouse,
    link: '/docs/advanced-guide/injecting-databases-drivers#clickhouse',
  },
  {
    image: redis,
    link: '/docs/quick-start/connecting-redis',
  },
  {
    image: mongoDb,
    link: '/docs/advanced-guide/injecting-databases-drivers#mongo-db',
  },
  {
    image: pubSub,
    link: '/docs/advanced-guide/using-publisher-subscriber#google',
  },
  {
    image: kafka,
    link: '/docs/advanced-guide/using-publisher-subscriber#kafka',
  },
  {
    image: sql,
    link: '/docs/advanced-guide/dealing-with-sql',
  },
  {
    image: cassandra,
    link: '/docs/advanced-guide/injecting-databases-drivers#cassandra',
  },
  {
    image: mqtt,
    link: '/docs/advanced-guide/using-publisher-subscriber#mqtt',
  },
  {
    image: Badger,
    link: '/docs/advanced-guide/key-value-store#badger-db',
  },
]

const getAnimationDelay = (index) => `calc(30s / 10 * (10 - ${index + 1}) * -1)`

const DBlistComponent = () => {
  return (
    <div className="bg-gray-900 py-10">
      <div className="mx-auto max-w-screen-2xl lg:px-8 xl:px-12">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-center text-lg font-semibold leading-8 text-slate-400">
            Built-in support for popular databases and messaging systems
          </h2>
          <div className="wrapper mx-auto mt-10 flex items-start ">
            {imageLink.map((item, idx) => {
              const animationDelay = getAnimationDelay(idx)
              const itemStyle = {
                animationDelay: animationDelay,
                cursor: 'pointer',
              }
              return (
                <Link href={item.link} key={idx}>
                  <Image
                    alt="Transistor"
                    src={item.image}
                    width={158}
                    height={48}
                    style={itemStyle}
                    className="item col-span-2 max-h-12 object-contain object-left lg:col-span-1"
                  />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DBlistComponent
