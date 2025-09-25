# Install dependencies only when needed
FROM node:23.11.1-alpine3.21

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY src src/.
COPY utils utils/.
COPY jsconfig.json .
COPY next.config.mjs .
COPY package.json .
COPY postcss.config.js .
COPY tailwind.config.js .
COPY yarn.lock .
COPY nginix.conf .






