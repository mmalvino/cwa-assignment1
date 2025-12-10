# ---------- 1. Dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app

# Optional, but useful for some native deps
RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci

# ---------- 2. Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ✅ Provide a default DATABASE_URL for Prisma config at build time
#    This points to dev.db in the project root (SQLite)
ARG DATABASE_URL="file:./dev.db"
ENV DATABASE_URL=${DATABASE_URL}

# Generate Prisma client (uses prisma.config.ts + DATABASE_URL)
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# ---------- 3. Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Copy package info + node_modules
COPY package.json package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules

# Copy built app, public assets, prisma schema/config, and SQLite DB
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts
COPY --from=builder /app/dev.db ./dev.db

# ✅ Runtime DATABASE_URL – same SQLite file
ENV DATABASE_URL="file:./dev.db"

EXPOSE 3000

# Start the Next.js app
CMD ["npm", "run", "start"]
