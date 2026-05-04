import Link from 'next/link'

// Ecosystem credibility signals — independent recognition from
// industry-standard sources. Stronger trust marker than a corporate
// logo strip and doesn't imply any commercial endorsement.
//
// Each card now carries a concrete metadata line (where in the source
// GoFr is listed) so the section reads as data rather than three
// generic "we are listed" claims. The visual treatment was previously
// thin — small monogram + thin border — which made the row feel like
// a placeholder. Bigger card padding, an accent-tinted background
// behind the monogram, and a labeled metadata pill give it weight
// proportional to the credibility it represents.
const items = [
  {
    name: 'ThoughtWorks Technology Radar',
    blurb: 'Independent assessment by ThoughtWorks of GoFr as a Go microservice framework worth knowing.',
    metaLabel: 'Section',
    metaValue: 'Languages & Frameworks',
    href: 'https://www.thoughtworks.com/en-in/radar/languages-and-frameworks/gofr',
    label: 'TW',
    accent: {
      border: 'group-hover:border-rose-400/60',
      tint: 'bg-rose-500/10 text-rose-300 border-rose-500/40',
      meta: 'text-rose-300/80',
    },
  },
  {
    name: 'CNCF Landscape',
    blurb: 'Listed in the Cloud Native Computing Foundation\u2019s open-source landscape index.',
    metaLabel: 'Category',
    metaValue: 'App Definition & Development',
    href: 'https://landscape.cncf.io/?selected=go-fr',
    label: 'CNCF',
    accent: {
      border: 'group-hover:border-sky-400/60',
      tint: 'bg-sky-500/10 text-sky-300 border-sky-500/40',
      meta: 'text-sky-300/80',
    },
  },
  {
    name: 'JetBrains',
    blurb: 'Maintainer GoLand and IDE licenses sponsored under the JetBrains Open Source support program.',
    metaLabel: 'Program',
    metaValue: 'Open Source',
    href: 'https://www.jetbrains.com/community/opensource/',
    label: 'JB',
    accent: {
      border: 'group-hover:border-amber-400/60',
      tint: 'bg-amber-500/10 text-amber-300 border-amber-500/40',
      meta: 'text-amber-300/80',
    },
  },
]

export function EcosystemRecognition() {
  return (
    <section className="px-4 py-12 lg:px-8 xl:px-12">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            In the ecosystem
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-white">
            Recognized where it counts
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {items.map((it) => (
            <Link
              key={it.name}
              href={it.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-900/70 ${it.accent.border}`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex h-11 w-11 flex-none items-center justify-center rounded-xl border font-mono text-xs font-semibold tracking-tight ${it.accent.tint}`}
                  aria-hidden="true"
                >
                  {it.label}
                </span>
                <svg
                  className="h-3.5 w-3.5 flex-none text-slate-600 transition-colors group-hover:text-slate-300"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M3.5 3.5h5v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  <path d="M8.5 3.5L3 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <h3 className="font-display text-base font-semibold text-white">
                  {it.name}
                </h3>
                <p className="mt-2 text-sm leading-snug text-slate-400">
                  {it.blurb}
                </p>
              </div>
              <div className="mt-auto flex items-baseline gap-2 border-t border-slate-800/80 pt-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  {it.metaLabel}
                </span>
                <span className={`text-xs font-medium ${it.accent.meta}`}>
                  {it.metaValue}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
