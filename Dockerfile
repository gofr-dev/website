# syntax=docker/dockerfile:1.7
#
# Multi-stage build for the GoFr website (Next.js static export).
#
# This image is the "shell" — website source + node_modules + Tailwind +
# the data files committed under src/data. It does NOT contain framework
# docs by itself; those live in the gofr-dev/gofr repo and get layered
# in by gofr-dev/gofr/docs/Dockerfile at deploy time, which does:
#
#   FROM ghcr.io/gofr-dev/website:${WEBSITE_TAG}
#   COPY docs/quick-start    /app/src/app/docs/quick-start
#   COPY docs/guides         /app/src/app/docs/guides
#   COPY docs/navigation.js  /app/src/lib
#   …
#   RUN npm run build
#
# So a hand-built image of THIS Dockerfile renders pages whose content
# lives in the website repo (Hero, examples, team, etc.) and shows
# placeholder/empty docs routes — that's expected. Use the framework's
# docs/Dockerfile for a fully-populated build.
#
# Stage 1 (builder): install deps, run `next build` which emits the static
#                    export under ./out (because `output: 'export'` is set
#                    in next.config.mjs).
# Stage 2 (runtime): nginx-alpine serving the exported HTML/CSS/JS from
#                    /usr/share/nginx/html on port 3000. nginx config lives
#                    in ./nginix.conf.
#
# Build:
#   docker build -t gofr-website:local .
# Run:
#   docker run --rm -p 3001:3000 gofr-website:local

# ---------- builder ----------
# 24.x is the active LTS (EOL 2028-04-30). The previous pin, 23.11.1, was an
# odd-numbered release: those never become LTS, and 23 went EOL on 2025-06-01 —
# so the Node that produced every deployed artifact was receiving no security
# patches. Pinned to a patch + Alpine minor, same style as before, so an
# upstream rebuild cannot silently change the toolchain under a release.
FROM node:24.19.0-alpine3.24 AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install deps in their own layer for better caching.
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/root/.cache/yarn \
    yarn install --frozen-lockfile

# Website source. Framework docs are not copied here — they're layered
# on top by the framework's docs/Dockerfile at deploy time.
COPY src src/
COPY utils utils/
COPY public public/
COPY jsconfig.json next.config.mjs postcss.config.js tailwind.config.js ./

# Run the offline prebuild generators that read local source files
# (changelog RSS, llms-full.txt) explicitly. Skip the GitHub-API fetches
# (releases / roadmap / team / stars) — those need a token and are run by
# CI's `yarn refresh-data` step before docker build.
RUN node utils/generate-changelog-rss.mjs && node utils/generate-llms-full.mjs && yarn next build

# ---------- runtime ----------
FROM nginx:1.27-alpine

# nginx config for the static export.
COPY nginix.conf /etc/nginx/conf.d/default.conf

# Replace the default nginx html dir with our exported site.
RUN rm -rf /usr/share/nginx/html
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 3000

# nginx default entrypoint already runs nginx in foreground.
CMD ["nginx", "-g", "daemon off;"]
