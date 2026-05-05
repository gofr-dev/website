# syntax=docker/dockerfile:1.7
#
# Multi-stage build for the GoFr website (Next.js static export).
#
# Stage 1 (builder): install deps, run `yarn build` which emits the static
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
FROM node:23.11.1-alpine3.21 AS builder

RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install deps in their own layer for better caching.
COPY package.json yarn.lock ./
RUN --mount=type=cache,target=/root/.cache/yarn \
    yarn install --frozen-lockfile

# Copy source. The docs markdown that lives in ../gofr/docs is expected to
# already be present under src/app/docs by the time docker build is invoked
# (the rsync step happens before docker build in CI; locally, run the
# rsync from the host first or pass --build-context).
COPY src src/
COPY utils utils/
COPY public public/
COPY jsconfig.json next.config.mjs postcss.config.js tailwind.config.js ./

# Skip prebuild data fetches that hit GitHub (rate-limited in CI without
# tokens). The local-pkg flow assumes data files are already current under
# src/data/. If you want to refresh team / releases / stars, run
# `yarn refresh-data` on the host before docker build.
RUN yarn next build

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
