# ---------- 1. Dependencies ----------
FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
RUN npm ci

# ---------- 2. Build ----------
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# ✅ Build-time DB path (matches prisma.config.ts)
ARG DATABASE_URL="file:./db_files/dev.db"
ENV DATABASE_URL=${DATABASE_URL}

RUN npx prisma generate
RUN npm run build

# ---------- 3. Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

COPY package.json package-lock.json ./
COPY --from=deps /app/node_modules ./node_modules

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/prisma.config.ts ./prisma.config.ts

# ✅ Copy SQLite DB from correct folder
COPY --from=builder /app/db_files/dev.db ./db_files/dev.db

# ✅ Runtime DATABASE_URL
ENV DATABASE_URL="file:./db_files/dev.db"

EXPOSE 3000
CMD ["npm", "run", "start"]
