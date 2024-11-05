# Install dependencies only when needed
FROM node:alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY src src/.
COPY public public/.
COPY jsconfig.json .
COPY next.config.mjs .
COPY package.json .
COPY postcss.config.js .
COPY tailwind.config.js .
COPY yarn.lock .






