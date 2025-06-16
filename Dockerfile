# Build stage
FROM oven/bun:1 AS builder

WORKDIR /app

# Copy package files
COPY package.json bun.lock ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Build the application
RUN bun run build

# Production stage
FROM oven/bun:1-slim

WORKDIR /app

# Copy package.json for scripts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock

# Copy node_modules (needed for drizzle-kit and runtime deps)
COPY --from=builder /app/node_modules ./node_modules

# Copy source files needed for migration
COPY --from=builder /app/src ./src
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Copy only the built output from the builder stage
COPY --from=builder /app/.output ./.output

# Expose the default port
EXPOSE 3000

# Create a startup script that runs migration then starts the app
RUN echo '#!/bin/sh\nsleep 10 && bun run db:push --force && bun run start' > /app/start.sh
RUN chmod +x /app/start.sh

# Set the command to run the startup script
CMD ["/app/start.sh"]
