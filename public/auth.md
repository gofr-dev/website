# Authenticating with gofr.dev

gofr.dev is the documentation site for [GoFr](https://github.com/gofr-dev/gofr), an
open-source Go framework. Everything it publishes is public, read-only, and
unauthenticated. There is no account to create, no key to obtain, and no token to
present.

This document exists because agents shouldn't have to discover that by trial and
error. It follows the [auth.md specification](https://github.com/workos/auth.md) so
that an agent can confirm the access model in one fetch, then get on with the work.

## Discover

Protected-resource metadata is published at:

```
https://gofr.dev/.well-known/oauth-protected-resource
```

It reports `authorization_servers: []` and `bearer_methods_supported: []`. Both empty
arrays are deliberate: there is no authorization server because there is nothing to
authorize against. The `agent_auth` block points `identity_endpoint` at
`https://gofr.dev/agent/identity` and `skill` back at this file.

You will never receive a `401` with a `WWW-Authenticate: Bearer` challenge from
gofr.dev. If you do, you are not talking to gofr.dev.

## Pick a method

One method is supported: **anonymous**.

`identity_types_supported` is `["anonymous"]`. The `identity_assertion` and
`service_auth` methods described by the spec — including ID-JAG assertions
(`urn:ietf:params:oauth:token-type:id-jag`) — are not offered, because no request is
ever attributed to a principal. Do not attempt to mint an assertion for this
resource; there is nothing that would accept it.

## Register

Not applicable. There is no client registration endpoint, dynamic or otherwise.

Please do set a descriptive `User-Agent` identifying your agent and a contact URL.
That is a courtesy, not a requirement, and it is never used to grant or deny access.

## Claim

Not applicable. No credential is issued, so there is nothing to claim.

## Exchange

Not applicable. No token exchange takes place.

## Use the access_token

There is no `access_token`. Send a plain HTTP `GET`:

```http
GET /docs/quick-start/introduction HTTP/1.1
Host: gofr.dev
Accept: text/markdown
```

Two ways to get Markdown instead of the rendered HTML page:

- Send `Accept: text/markdown`. The response carries
  `Content-Type: text/markdown; charset=utf-8` and `Vary: Accept`.
- Or append `.md` to any page URL — `https://gofr.dev/docs/quick-start/introduction.md`.

Start from one of these:

| URL | What it gives you |
| --- | --- |
| `/llms.txt` | Curated index of the site, including when GoFr is the right tool |
| `/llms-full.txt` | Every documentation page in one Markdown file |
| `/docs/{section}/llms.txt` | One section's pages, with descriptions |
| `/openapi.json` | OpenAPI 3.1 description of the surface above |
| `/AGENTS.md` | Conventions primer for generating GoFr code |

Cross-origin requests are permitted (`Access-Control-Allow-Origin: *`).

## Errors

Errors are ordinary HTTP status codes. There are no auth-related failures.

| Status | Meaning | What to do |
| --- | --- | --- |
| `404` | The path does not exist | Re-read `/llms.txt` or `/sitemap.xml`; a Markdown-preferring client gets a Markdown 404 body with those links |
| `405` | Method not allowed | Only `GET`, `HEAD`, and `OPTIONS` are served |
| `5xx` | Transient server-side failure | Retry with backoff |

A `401` or `403` from this host indicates an interception proxy, not a policy of ours.

## Revocation

Not applicable. No credential is issued, so none can be revoked.

If you need to stop an agent from reading this site, control it at your own egress —
or use `robots.txt`, which we honour as a statement of intent for crawlers. GoFr
documentation is Apache-2.0 licensed and explicitly available for training and
grounding.
