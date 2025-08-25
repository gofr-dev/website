import { Icon } from '@/components/Icon'

export function QuickLinks({ children }) {
  return (
    <div className="not-prose my-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {children}
    </div>
  )
}

export function QuickLink({ title, description, icon, href }) {
  const Container = href ? 'a' : 'div';
  
  return (
    <Container 
      href={href}
      className={`group relative rounded-xl border border-slate-200 dark:border-slate-800 block transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-4 hover:shadow-2xl hover:shadow-slate-900/30 dark:hover:shadow-slate-900/50 ${
        href ? 'no-underline hover:cursor-pointer' : ''
      }`}
      style={{ zIndex: 1 }}
    >
      <div className="absolute -inset-px rounded-xl border-2 border-transparent opacity-0 [background:linear-gradient(var(--quick-links-hover-bg,theme(colors.sky.50)),var(--quick-links-hover-bg,theme(colors.sky.50)))_padding-box,linear-gradient(to_top,theme(colors.indigo.400),theme(colors.cyan.400),theme(colors.sky.500))_border-box] group-hover:opacity-100 dark:[--quick-links-hover-bg:theme(colors.slate.800)]" />
      <div className="relative overflow-hidden rounded-xl p-6 h-full">
        <Icon icon={icon} className="h-8 w-8" />
        <h2 className="mt-4 font-display text-base text-slate-900 dark:text-white">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-700 dark:text-slate-400">
          {description}
        </p>
      </div>
    </Container>
  );
}