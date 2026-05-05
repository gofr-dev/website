import { CountUp } from '@/components/CountUp'
import company1 from '@/images/doceree.svg'
import company2 from '@/images/americanExpress.svg'
import company3 from '@/images/ibm.svg'
import company4 from '@/images/mydbops.svg'
import company5 from '@/images/guidewire.svg'
import company6 from '@/images/weave.svg'
import company8 from '@/images/blinkit.svg'
import company11 from '@/images/walmart.svg'
import company10 from '@/images/mcafee.svg'
import Image from 'next/image'

const imageLink = [
  { image: company2,  name: 'American Express' },
  { image: company3,  name: 'IBM' },
  { image: company10, name: 'McAfee' },
  { image: company8,  name: 'Blinkit' },
  { image: company11, name: 'Walmart' },
  { image: company1,  name: 'Doceree' },
  { image: company4,  name: 'Mydbops' },
  { image: company5,  name: 'Guidewire' },
  { image: company6,  name: 'Weave' },
]

export default function CompanyList() {
  return (
    <div className="py-16 sm:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-lg/8 font-semibold text-white">
          Trusted by{' '}
          <CountUp
            value={21500}
            durationMs={1500}
            format={(n) => `${n.toLocaleString()}+`}
          />{' '}
          Developers at Companies Like:
        </h2>
        {/* 9 logos: pick column counts that divide evenly so we
            don't end on a ragged orphan row. 3 cols at every
            breakpoint (3+3+3) is more deliberate than the previous
            4+4+1 (mobile), 6+3 (sm), 5+4 (lg) ladder. */}
        <div className="mt-10 grid grid-cols-3 justify-items-center gap-x-6 gap-y-10">
          {imageLink.map((item, index) => (
            <div
              key={index}
              className="flex max-h-12 w-full justify-center"
            >
              <Image
                alt={item.name}
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
