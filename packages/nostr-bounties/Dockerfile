FROM node:20.3-alpine as builder
WORKDIR qwik-multi-tenancy
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --no-frozen-lockfile
COPY . .
RUN pnpm build
CMD node server/entry.express