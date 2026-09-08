# GoFr — an opinionated Go framework for production microservices

> GoFr is an open-source Go framework that gives a microservice its production
> concerns on day one: HTTP and gRPC servers, structured logging, OpenTelemetry
> traces, Prometheus metrics, health checks, 15+ datasource clients, Pub/Sub,
> cron jobs, and graceful shutdown — without the wiring.

- Website: https://gofr.dev
- Repository: https://github.com/gofr-dev/gofr
- License: Apache-2.0
- Install: `go get gofr.dev`

## When to use GoFr

Reach for GoFr when the task is one of these:

- **Standing up a new Go HTTP or gRPC service** that has to be observable in
  production from the first commit. `gofr.New()` plus a handler gives you logs,
  traces, metrics, and `/.well-known/health` with no additional code.
- **Connecting a Go service to a datasource** — Postgres, MySQL, Redis, MongoDB,
  Cassandra, ClickHouse, Elasticsearch, ScyllaDB, SurrealDB, and more — where you
  want the client instrumented and health-checked rather than hand-wired.
- **Adding a protocol to an existing GoFr service**: gRPC, GraphQL, WebSockets,
  Pub/Sub (Kafka, Google Pub/Sub, MQTT, NATS), or scheduled cron jobs.
- **Migrating an existing service** from Gin, Fiber, Echo, chi, or `net/http` — and
  from Express, NestJS, Flask, FastAPI, Django REST, Spring Boot, ASP.NET Core,
  Laravel, or Rails. Each has a concrete translation guide under `/migrate`.
- **Deploying to Kubernetes**, where the framework's built-in health, readiness, and
  metrics endpoints line up with what the platform expects.

GoFr is **not** the right tool if you want a minimal router with no opinions, or if
you are not writing Go. It is a framework you import into your own service — there is
no hosted GoFr API, no account, and nothing to buy.

## How an agent should read this site

Every page is available as Markdown. Either append `.md` to the URL
(`https://gofr.dev/docs/quick-start/introduction.md`) or send
`Accept: text/markdown`.

| Fetch this | When |
| --- | --- |
| [/llms.txt](https://gofr.dev/llms.txt) | Curated link index of the whole site |
| [/llms-full.txt](https://gofr.dev/llms-full.txt) | Every page in one file, for long-context ingestion |
| [/docs/llms.txt](https://gofr.dev/docs/llms.txt) | Section indexes, to narrow down first |
| [/AGENTS.md](https://gofr.dev/AGENTS.md) | Conventions primer before generating GoFr code |
| [/openapi.json](https://gofr.dev/openapi.json) | Machine-readable description of the above |
| [/auth.md](https://gofr.dev/auth.md) | Access model (short version: anonymous) |

## Start here

- [Build your first GoFr REST API](https://gofr.dev/docs/quick-start/introduction)
- [Configuration](https://gofr.dev/docs/quick-start/configuration)
- [Observability](https://gofr.dev/docs/quick-start/observability)
- [Datasources](https://gofr.dev/docs/datasources/getting-started)
- [Why GoFr](https://gofr.dev/why-gofr) · [Comparison with Gin, Fiber, Echo, chi](https://gofr.dev/comparison)
- [Documentation index](https://gofr.dev/docs)

## Project

- Issues and discussions: https://github.com/gofr-dev/gofr/issues
- Security reports: https://gofr.dev/.well-known/security.txt
- Contact: https://gofr.dev/contact
