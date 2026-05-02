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
import eventhub from '@/images/event_hub.svg'
import Image from 'next/image'

const imageLink = [
  { image: ftp,        name: 'FTP',         link: '/docs/advanced-guide/handling-file' },
  { image: clickHouse, name: 'ClickHouse',  link: '/docs/advanced-guide/injecting-databases-drivers#clickhouse' },
  { image: redis,      name: 'Redis',       link: '/docs/quick-start/connecting-redis' },
  { image: eventhub,   name: 'Azure Event Hub', link: '/docs/advanced-guide/using-publisher-subscriber#publisher-subscriber' },
  { image: mongoDb,    name: 'MongoDB',     link: '/docs/advanced-guide/injecting-databases-drivers#mongo-db' },
  { image: pubSub,     name: 'Google Pub/Sub', link: '/docs/advanced-guide/using-publisher-subscriber#google' },
  { image: kafka,      name: 'Kafka',       link: '/docs/advanced-guide/using-publisher-subscriber#kafka' },
  { image: sql,        name: 'SQL',         link: '/docs/advanced-guide/dealing-with-sql' },
  { image: cassandra,  name: 'Cassandra',   link: '/docs/advanced-guide/injecting-databases-drivers#cassandra' },
  { image: mqtt,       name: 'MQTT',        link: '/docs/advanced-guide/using-publisher-subscriber#mqtt' },
  { image: Badger,     name: 'Badger',      link: '/docs/advanced-guide/key-value-store#badger-db' },
]

const getAnimationDelay = (index) => `calc(30s / 11 * (11 - ${index + 1}) * -1)`

const DBlistComponent = () => {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-screen-2xl lg:px-8 xl:px-12">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2 className="text-center text-lg font-semibold leading-8 text-white">
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
                <Link href={item.link} key={idx} aria-label={item.name}>
                  <Image
                    alt={item.name}
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
