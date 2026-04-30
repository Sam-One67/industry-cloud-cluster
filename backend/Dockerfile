# Build & Dependencies ---
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies first (better caching)
COPY package*.json ./
RUN npm install --only=production

# Copy source code
COPY . .

# Final Production Image ---
FROM node:18-alpine

# Use non-root user for security (Industry Standard)
USER node
WORKDIR /usr/src/app

# Copy only the necessary files from builder stage
COPY --from=builder /usr/src/app /usr/src/app

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]