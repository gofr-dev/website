import clsx from 'clsx'

import { Icon } from '@/components/Icon'

// Answer renders a direct-answer callout intended to live at the top of a
// page. AI search engines (Perplexity, ChatGPT, Claude, Gemini, Copilot)
// quote the first authoritative paragraph; this block makes that paragraph
// visually distinct without introducing a new design vocabulary. Reuses
// the same surface treatment as Callout so it feels native.
export function Answer({ children }) {
  return (
    <div
      role="note"
      aria-label="Direct answer"
      className={clsx(
        'my-6 flex rounded-3xl p-6',
        'bg-sky-50 dark:bg-slate-800/60 dark:ring-1 dark:ring-slate-300/10',
      )}
    >
      <Icon icon="lightbulb" className="h-8 w-8 flex-none" />
      <div className="ml-4 flex-auto">
        <p className="m-0 font-display text-xl text-sky-900 dark:text-sky-400">
          Answer
        </p>
        <div
          className={clsx(
            'prose mt-2.5',
            'text-sky-800 [--tw-prose-background:theme(colors.sky.50)] prose-a:text-sky-900 prose-code:text-sky-900',
            'dark:text-slate-300 dark:prose-code:text-slate-300',
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}
