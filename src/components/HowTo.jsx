// HowTo wraps a short ordered procedure (e.g. "How to connect MySQL in GoFr").
// Visually it is a styled ordered list reusing prose vocabulary; semantically
// it emits HowTo JSON-LD so AI search engines and Google rich results can
// surface the steps.
//
// Two modes — the discriminator is `children`:
//
//  - **Visible mode**: opening + closing tag with body content between them.
//    `name` / `description` / `steps` populate the JSON-LD AND render the
//    visible h2 + description + body chrome.
//        {% howto name="..." description="..." steps=[...] %}
//          some custom prose
//        {% /howto %}
//
//  - **Schema-only mode**: self-closing tag (no children). Emits JSON-LD
//    only, no visible chrome — drop one at the top of an existing guide
//    for AEO/SEO without changing the page layout. `name` / `description`
//    still feed the JSON-LD's name/description fields.
//        {% howto name="..." description="..." steps=[...] /%}
//
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

  // Self-closing tags from Markdoc pass an empty / falsy children. That's
  // the schema-only signal — `name` and `description` still feed the
  // JSON-LD but the visible chrome is suppressed.
  const hasBody = Boolean(children) && (
    !Array.isArray(children) || children.length > 0
  )

  if (!hasBody) {
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
