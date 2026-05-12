# Schema.org JSON-LD blocks for gofr.dev

Drop-in blocks for the Next.js layouts. These are eligible for Google rich results once Search Console picks them up.

## 1. Organization + SoftwareApplication (root layout)

Add to `src/app/layout.jsx`, inside the `<head>` (or via Next's `Script` component with `type="application/ld+json"`):

```jsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": "https://gofr.dev/#organization",
          "name": "GoFr",
          "url": "https://gofr.dev",
          "logo": "https://gofr.dev/logo.png",
          "sameAs": [
            "https://github.com/gofr-dev/gofr",
            "https://twitter.com/gofr_dev",
            "https://discord.gg/gofr"
          ],
          "description": "GoFr is an opinionated Go framework within the CNCF Landscape, designed for accelerated microservice development."
        },
        {
          "@type": "SoftwareApplication",
          "@id": "https://gofr.dev/#software",
          "name": "GoFr",
          "alternateName": "GoFr Framework",
          "applicationCategory": "DeveloperApplication",
          "applicationSubCategory": "WebFramework",
          "operatingSystem": "Linux, macOS, Windows",
          "programmingLanguage": "Go",
          "url": "https://gofr.dev",
          "downloadUrl": "https://github.com/gofr-dev/gofr",
          "license": "https://github.com/gofr-dev/gofr/blob/main/LICENSE",
          "softwareVersion": "latest",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.8",
            "ratingCount": "150",
            "bestRating": "5"
          },
          "author": {
            "@id": "https://gofr.dev/#organization"
          }
        },
        {
          "@type": "WebSite",
          "@id": "https://gofr.dev/#website",
          "url": "https://gofr.dev",
          "name": "GoFr",
          "publisher": {
            "@id": "https://gofr.dev/#organization"
          },
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://gofr.dev/docs?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }
      ]
    })
  }}
/>
```

The `aggregateRating` field is optional and only legitimate if you have a real review source (G2, GitHub stars-as-proxy, etc.). Remove it if you don't want to claim a number.

## 2. BreadcrumbList (docs layout)

Add to `src/app/docs/layout.jsx`. The breadcrumb chain depends on the route, so this needs to be computed per page:

```jsx
function breadcrumbsForPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  return parts.map((part, i) => ({
    "@type": "ListItem",
    "position": i + 1,
    "name": part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' '),
    "item": `https://gofr.dev/${parts.slice(0, i + 1).join('/')}`
  }));
}

export default function DocsLayout({ children }) {
  const pathname = usePathname(); // or pull from props/server context
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": breadcrumbsForPath(pathname)
          })
        }}
      />
      {children}
    </>
  );
}
```

Google often shows the breadcrumb chips in SERP, lifting CTR.

## 3. FAQPage (FAQ page)

Add to `src/app/faq/page.jsx`. Replace the placeholder Q&As with the real ones from your FAQ content:

```jsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is GoFr?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "GoFr is an opinionated Go framework for building microservices. It ships with built-in observability (logs, metrics, traces), 15+ datasource integrations, gRPC, GraphQL, WebSockets, and pub/sub support. GoFr is listed in the CNCF Landscape."
          }
        },
        {
          "@type": "Question",
          "name": "How is GoFr different from Gin or Fiber?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Gin and Fiber are routers with middleware ecosystems; you assemble observability, datasources, and pub/sub yourself. GoFr is a service framework that ships these built-in. See gofr.dev/comparison for a detailed side-by-side."
          }
        },
        {
          "@type": "Question",
          "name": "Is GoFr production-ready?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. GoFr is in active production use across multiple companies and is listed in the CNCF Landscape. The current version is 1.x with semantic versioning guarantees."
          }
        },
        {
          "@type": "Question",
          "name": "What databases does GoFr support out of the box?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "PostgreSQL, MySQL, Redis, MongoDB, Cassandra, ClickHouse, and several others — all with first-party clients that include health checks, metrics, and trace propagation."
          }
        },
        {
          "@type": "Question",
          "name": "Does GoFr support Kafka and other message queues?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. GoFr ships first-class subscribers for Kafka, NATS JetStream, and Google Pub/Sub. Subscriber handlers share the same observability conventions as HTTP and gRPC handlers."
          }
        },
        {
          "@type": "Question",
          "name": "Is GoFr open source?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. GoFr is open source under the Apache 2.0 license. The source code lives at github.com/gofr-dev/gofr."
          }
        }
      ]
    })
  }}
/>
```

Update the question list once your FAQ page content is finalized.

## 4. HowTo (for tutorial blog posts)

Add this on tutorial posts that walk through a build (the OTel post, the Kafka consumer post, the production checklist post). Example for an OTel tutorial:

```jsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to add OpenTelemetry traces to a Go microservice",
      "description": "Step-by-step guide to setting up OpenTelemetry distributed tracing in a Go microservice using GoFr.",
      "totalTime": "PT15M",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Install GoFr",
          "text": "Run `go install gofr.dev/cmd/gofr@latest` to install the GoFr CLI."
        },
        {
          "@type": "HowToStep",
          "name": "Initialize a service",
          "text": "Run `gofr init my-service` to scaffold a new service with observability pre-configured."
        },
        {
          "@type": "HowToStep",
          "name": "Configure OTel exporter",
          "text": "Set OTEL_EXPORTER_OTLP_ENDPOINT in configs/.env to point at your OTel collector."
        }
      ]
    })
  }}
/>
```

## 5. Article (for blog posts)

For every blog post, add:

```jsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "TechArticle",
      "headline": "{post.title}",
      "description": "{post.description}",
      "image": "https://gofr.dev/blog/{post.slug}/og.png",
      "datePublished": "{post.publishedAt}",
      "dateModified": "{post.updatedAt}",
      "author": {
        "@type": "Person",
        "name": "Aryan Mehrotra",
        "url": "https://github.com/aryanmehrotra"
      },
      "publisher": {
        "@id": "https://gofr.dev/#organization"
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://gofr.dev/blog/{post.slug}"
      }
    })
  }}
/>
```

`TechArticle` over `Article` because it's eligible for richer code-snippet rendering in some SERP layouts.

## How to verify

After deploying:

1. Run the page through [Google Rich Results Test](https://search.google.com/test/rich-results) — paste the URL, see what types are detected.
2. Submit the URL via Search Console > URL Inspection > Request Indexing.
3. Wait 2–14 days for the SERP feature to appear (Google's call, not yours).
