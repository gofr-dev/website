# Meta descriptions for top docs and landing pages

These go into the Markdoc frontmatter as the `description:` field. Each is 140–155 characters — the sweet spot before Google truncates. Each leads with the value, not the brand. Each has the topic keyword at the front so it survives Google's snippet rewrites.

## Quick Start

`/docs/quick-start/introduction`
> Build your first Go microservice with GoFr in 5 minutes. Structured logs, metrics, and traces are wired by default — no boilerplate.

`/docs/quick-start/configuration`
> Configure a GoFr application with environment variables, YAML files, and secrets. Bind config into typed Go structs at startup.

`/docs/quick-start/add-rest-handlers`
> Add REST handlers in Go with GoFr. Path params, query strings, JSON bodies — with response marshalling and error envelopes handled.

`/docs/quick-start/connecting-redis`
> Connect Redis to a Go microservice with GoFr's first-party client. Health checks, metrics, and trace propagation are included by default.

`/docs/quick-start/connecting-mysql`
> Connect MySQL to a Go microservice using GoFr's built-in SQL client. Pooling, health probes, and observability are configured automatically.

`/docs/quick-start/observability`
> OpenTelemetry traces, Prometheus metrics, and structured logs in a Go microservice — all wired by default. Configure your exporter and ship.

## Advanced Guide

`/docs/advanced-guide/grpc`
> Build a gRPC server and client in Go with GoFr. Trace propagation, metrics, and health checks come built in — no separate observability setup.

`/docs/advanced-guide/using-publisher-subscriber`
> Implement the publisher-subscriber pattern in Go with Kafka, NATS JetStream, or Google Pub/Sub. Subscribers are first-class handlers in GoFr.

`/docs/advanced-guide/circuit-breaker`
> Add circuit breakers to a Go microservice with GoFr. Protect downstream services from cascading failures with a few lines of configuration.

`/docs/advanced-guide/http-communication`
> Make service-to-service HTTP calls in Go with GoFr's tracing-aware HTTP client. Retries, timeouts, and circuit breakers are configurable.

`/docs/advanced-guide/middlewares`
> Write middlewares in Go with GoFr. The framework uses standard net/http middleware shape, so any existing http.Handler middleware works.

`/docs/advanced-guide/swagger`
> Generate OpenAPI / Swagger documentation for Go services with GoFr. Annotations on handlers produce a hosted spec at /swagger automatically.

`/docs/advanced-guide/debugging`
> Debug and profile Go microservices in production. GoFr exposes pprof endpoints and trace context so you can find slow requests fast.

`/docs/advanced-guide/monitoring-service-health`
> Health checks in Go microservices with GoFr. Readiness and liveness probes that automatically include registered datasources.

`/docs/advanced-guide/custom-metrics`
> Add custom Prometheus metrics to a Go microservice with GoFr. Counters, histograms, and gauges — registered once, scraped at /metrics.

`/docs/advanced-guide/data-migrations`
> Database migrations in Go with GoFr. Forward and rollback migrations run at startup, with locking to prevent concurrent execution.

## Landing pages

`/` (homepage)
> GoFr is an opinionated Go framework for microservices, with built-in observability, 15+ datasource integrations, gRPC, and pub/sub. CNCF Landscape.

`/why-gofr`
> Why GoFr: the Go framework that ships logs, metrics, traces, health checks, and datasource clients on the first commit. CNCF Landscape member.

`/comparison`
> Honest comparison of Gin, Fiber, Echo, Chi, and GoFr. Feature matrix, decision tree, and head-to-head pages to help pick a Go web framework.

`/comparison/gin`
> Gin vs GoFr: when each one is right. Gin is the fastest router; GoFr is the shorter path to a production service. Honest side-by-side with code.

`/comparison/fiber`
> Fiber vs GoFr: Fasthttp speed or net/http service framework. Recipes cookbook vs built-in observability. Pick by what your service needs.

`/comparison/echo`
> Echo vs GoFr: minimalist router or service framework. Echo is small and idiomatic; GoFr ships logs, metrics, and traces by default.

`/comparison/chi`
> Chi vs GoFr: different categories of tool. Chi is a stdlib-compatible router; GoFr is a microservice framework. Here's how to pick.

`/migrate/gin-to-gofr`
> Migrate from Gin to GoFr in a week. Handler signatures change slightly, middleware mostly stays the same, boot code shrinks 80%. Walkthrough.

`/migrate/express-to-gofr`
> Migrate from Express.js to GoFr when you're done with Node. Lower memory, type safety, and observability built in. Migration plan inside.

## How to apply

Each line above is meant to be pasted into the Markdoc frontmatter `description:` field for the corresponding page. The Next.js metadata generator will pick it up and emit it as `<meta name="description">` and `<meta property="og:description">`.

To find each file: `git grep -l "Quick Start Guide"` in the repo that hosts the docs Markdoc files. The frontmatter block at the top of each file is where the change goes.

After deploying, run each URL through [Google's URL Inspection](https://search.google.com/search-console) and request re-indexing so the new description gets picked up faster than the next crawl cycle.
