// HowTo wraps a short ordered procedure (e.g. "How to connect MySQL in GoFr").
// Visually it is a styled ordered list reusing prose vocabulary; semantically
// it emits HowTo JSON-LD so AI search engines and Google rich results can
// surface the steps.
//
// Two modes:
//  - **Visible mode**: pass `name` (and optionally `description` and/or
//    `children`). Renders an h2 + description + body, plus the JSON-LD.
//    Use when you want the page to also have a styled "How to do X"
//    block.
//  - **Schema-only mode**: pass just `steps` (and optionally `name` /
//    `description` for the JSON-LD itself). Renders nothing visible —
//    only the JSON-LD <script> — so authors can drop a `{% howto
//    steps=[...] /%}` self-closing tag at the top of an existing guide
//    purely for AEO/SEO without changing visible layout.
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

  const hasVisibleContent =
    Boolean(name) || Boolean(description) || Boolean(children)

  if (!hasVisibleContent) {
    // Schema-only: emit JSON-LD with no surrounding chrome.
    return jsonLd ? (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    ) : null
  }

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
