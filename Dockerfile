# Install dependencies only when needed
FROM node:16-alpine AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY . .




