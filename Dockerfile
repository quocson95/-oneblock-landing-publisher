ARG NODE_VERSION=22.12

FROM node:${NODE_VERSION}-alpine AS base

FROM base AS builder

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN corepack enable
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./
# Install dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

# Copy the source code
COPY . .

# Buid
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm build

# Use the Nginx image to serve the Angular app
FROM base

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

ENV HOSTNAME="0.0.0.0"
ENV PORT=80
# Expose port 80
EXPOSE 80
CMD ["node", "server.js"]