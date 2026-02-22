# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Enable environment variables during build time
ARG VITE_API_BASE
ENV VITE_API_BASE=$VITE_API_BASE

# Step 1: Install dependencies
COPY package*.json ./
RUN npm install 

# Step 2: Copy code แล้วค่อย build
COPY . .
RUN npm run build

# Production stage
FROM node:22-alpine AS production
WORKDIR /app

# Copy built app to a temporary location first
COPY --from=builder /app/dist ./dist_temp

# 1. Place files at root (for customer's Nginx rewrite)
# 2. Duplicate files into /booking folder (for our local test)
RUN mkdir -p dist/booking && \
    cp -r dist_temp/* dist/ && \
    cp -r dist_temp/* dist/booking/ && \
    rm -rf dist_temp

# Add a safe redirect in index.html (Only if someone lands on / directly)
RUN sed -i 's|<head>|<head><script>if(window.location.pathname==="/"\|\|window.location.pathname==="")window.location.href="/booking/"</script>|' dist/index.html

# Expose port
EXPOSE 8794

# Use npx to run sirv-cli, serving from the root of 'dist' 
# so it can find things at /booking/...
CMD ["npx", "sirv-cli", "dist", "--port", "8794", "--host", "0.0.0.0", "--single"]