import Image from 'next/image'
import blurCyanImage from '@/images/blur-cyan.png'
import blurIndigoImage from '@/images/blur-indigo.png'

// Decorative gradient layer for the framework's pitch / showcase
// surfaces — homepage, /why-gofr, /comparison/*, /showcase, /migrate/*.
// Three pointer-events-none orbs distributed down the page at
// alternating sides, reusing the cyan + indigo vocabulary the hero
// already establishes. Drop inside any `relative overflow-x-clip`
// wrapper.
//
// Why an absolute layer instead of a CSS background-image:
//   - Matches the existing Hero implementation (Image PNGs, opacity).
//   - Lets us anchor each orb relative to a known parent, so different
//     pages can opt in without re-tuning a body-level gradient.
//
// Why `unoptimized` is mandatory: the site builds with
// `output: 'export'`, which disables /_next/image. Without unoptimized,
// Next emits a /_next/image?url=... src that 404s in production and
// renders as a broken-image icon.
export function ShowcaseGradient() {
  return (
    <>
      <Image
        aria-hidden="true"
        className="pointer-events-none absolute -left-32 top-[30%] hidden select-none opacity-20 sm:block"
        src={blurCyanImage}
        alt=""
        width={530}
        height={530}
        loading="lazy"
        unoptimized
      />
      <Image
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-[55%] hidden select-none opacity-20 sm:block"
        src={blurIndigoImage}
        alt=""
        width={567}
        height={567}
        loading="lazy"
        unoptimized
      />
      <Image
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-[80%] hidden select-none opacity-15 sm:block"
        src={blurCyanImage}
        alt=""
        width={530}
        height={530}
        loading="lazy"
        unoptimized
      />
    </>
  )
}
