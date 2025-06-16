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
# Production stage
FROM oven/bun:1-slim

WORKDIR /app

# Copy package.json for scripts
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/bun.lock ./bun.lock

# Install only drizzle-kit for migrations
RUN bun add drizzle-kit

# Copy only schema and env files needed for migration
COPY --from=builder /app/src/db ./src/db
COPY --from=builder /app/src/env.ts ./src/env.ts
COPY --from=builder /app/drizzle.config.ts ./drizzle.config.ts
COPY --from=builder /app/tsconfig.json ./tsconfig.json

# Copy only the built output
COPY --from=builder /app/.output ./.output

# Expose the default port
EXPOSE 3000

# Create a startup script that runs migration then starts the app
RUN echo '#!/bin/sh\nbun run db:push --force && bun run start' > /app/start.sh
RUN chmod +x /app/start.sh

# Set the command to run the startup script
CMD ["/app/start.sh"]
