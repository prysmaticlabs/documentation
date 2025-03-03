FROM node:20-alpine as builder

# Only install minimal dependencies needed for Node.js builds
RUN apk add --no-cache libc6-compat

WORKDIR /app/website

# Copy package files first to leverage Docker cache
COPY ./website/package*.json ./

# Install dependencies
RUN npm ci

# Copy source files
COPY ./website ./

# Build the site
RUN npm run build

# Production stage
FROM caddy:alpine

# Remove default caddy files
RUN rm -rf /usr/share/caddy/html/*

COPY --from=builder /app/website/build /usr/share/caddy/html
COPY Caddyfile /etc/caddy/Caddyfile
COPY robots.txt /usr/share/caddy/html/robots.txt

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile"]
