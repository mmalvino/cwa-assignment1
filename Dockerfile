# --- STAGE 1: Dependency Installation ---
# Use the official Node image as the base
FROM node:20-alpine AS deps
WORKDIR /app

# Copy lockfiles and package files to leverage Docker caching
COPY package.json package-lock.json ./
RUN npm ci

# --- STAGE 2: Production Build ---
FROM node:20-alpine AS builder
WORKDIR /app
ENV NODE_ENV production

# Copy dependencies from the previous stage
COPY --from=deps /app/node_modules ./node_modules
# Copy all source files
COPY . .

# Generate the Prisma client for the build
# This needs to be done *before* the next build
COPY prisma ./prisma
# The DATABASE_URL is required for the client generation command
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
RUN npx prisma generate

# Build the Next.js app
RUN npm run build

# --- STAGE 3: Production Runner (Final Image) ---
# Use a minimal node image for security and size
FROM node:20-alpine AS runner
WORKDIR /app

# Create a non-root user for security (Best Practice)
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

# Set environment variables for runtime
ENV NODE_ENV production
# Set a default port
ENV PORT 3000
EXPOSE 3000

# Copy the standalone build output from the builder stage
# The 'standalone' folder contains the server and a minimal node_modules
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy the static assets and public files
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static

# Switch to root temporarily to create the directory
USER root
# IMPORTANT: Setup for SQLite Persistence
RUN mkdir -p /data
# Give ownership to the nextjs user so the running application can write the DB file
RUN chown -R nextjs:nodejs /data 

# Switch back to the low-privileged user for running the app
USER nextjs 

# The command to start the application
CMD ["node", "server.js"]