import clsx from 'clsx'

export function Prose({ as, className, ...props }) {
  let Component = as ?? 'div'

  return (
    <Component
      className={clsx(
        className,
        'prose prose-slate max-w-none dark:prose-invert dark:text-slate-300',
        // headings
        'prose-headings:scroll-mt-28 prose-headings:font-display prose-headings:font-semibold lg:prose-headings:scroll-mt-[8.5rem]',
        // lead
        'prose-lead:text-slate-500 dark:prose-lead:text-slate-400',
        // links
        'prose-a:font-semibold dark:prose-a:text-sky-400',
        // link underline
        'prose-a:no-underline prose-a:shadow-[inset_0_-2px_0_0_var(--tw-prose-background,#fff),inset_0_calc(-1*(var(--tw-prose-underline-size,4px)+2px))_0_0_var(--tw-prose-underline,theme(colors.sky.300))] hover:prose-a:[--tw-prose-underline-size:6px] dark:[--tw-prose-background:theme(colors.slate.900)] dark:prose-a:shadow-[inset_0_calc(-1*var(--tw-prose-underline-size,2px))_0_0_var(--tw-prose-underline,theme(colors.sky.800))] dark:hover:prose-a:[--tw-prose-underline-size:6px]',
        // pre — `overflow-x-auto` lets long lines scroll inside the
        // block instead of widening the prose column (the latter
        // forced page-level horizontal scroll on docs/configs etc.
        // at narrow viewports).
        'prose-pre:overflow-x-auto prose-pre:rounded-lg prose-pre:bg-slate-900 prose-pre:shadow-lg dark:prose-pre:bg-slate-800/60 dark:prose-pre:shadow-none dark:prose-pre:ring-1 dark:prose-pre:ring-slate-300/10',
        // inline code — `break-words` so long unbreakable tokens
        // (env-var names, connection strings, fully-qualified Go
        // identifiers) wrap instead of pushing the column wider
        // than the viewport.
        'prose-code:rounded prose-code:bg-slate-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[0.8125em] prose-code:font-medium prose-code:break-words prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-slate-800 dark:prose-code:text-slate-300',
        // hr
        'dark:prose-hr:border-slate-800',
        // tables — `block` + `overflow-x-auto` keeps a wide
        // configuration table from forcing the entire page wider
        // than the viewport on mobile (was the worst offender at
        // /docs/references/configs and /docs/references/testing).
        // Loses zero visual fidelity at desktop widths.
        'prose-table:block prose-table:overflow-x-auto prose-table:text-sm',
        'prose-thead:border-b prose-thead:border-slate-200 dark:prose-thead:border-slate-700',
        'prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-slate-900 dark:prose-th:text-slate-200',
        'prose-td:py-2',
        'prose-tr:border-b prose-tr:border-slate-100 dark:prose-tr:border-slate-800',
        // images
        'prose-img:rounded-lg',
      )}
      {...props}
    />
  )
}
