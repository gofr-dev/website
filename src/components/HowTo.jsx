// HowTo wraps a short ordered procedure (e.g. "How to connect MySQL in GoFr").
// Visually it is a styled ordered list reusing prose vocabulary; semantically
// it emits HowTo JSON-LD so AI search engines and Google rich results can
// surface the steps.
export function HowTo({ name, description, steps = [], children }) {
  const jsonLd =
    steps && steps.length
      ? {
          '@context': 'https://schema.org',
          '@type': 'HowTo',
          name: name,
          description: description,
          step: steps.map((s, i) => ({
            '@type': 'HowToStep',
            position: i + 1,
            name: s.name ?? `Step ${i + 1}`,
            text: s.text,
          })),
        }
      : null

  return (
    <section className="my-8">
      {name && (
        <h2 className="font-display text-xl text-slate-900 dark:text-white">
          {name}
        </h2>
      )}
      {description && (
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-400">
          {description}
        </p>
      )}
      <div className="mt-4">{children}</div>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </section>
  )
}
