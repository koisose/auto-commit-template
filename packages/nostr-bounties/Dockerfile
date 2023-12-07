FROM node:20.3-alpine as builder
WORKDIR qwik-multi-tenancy
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile
RUN npx playwright install
ENV NODE_ENV production
RUN apk add --no-cache \
    udev \
    ttf-freefont \
    chromium
COPY . .
RUN pnpm build
CMD node server/entry.express