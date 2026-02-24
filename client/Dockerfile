# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
ARG VITE_API_BASE
ENV VITE_API_BASE=$VITE_API_BASE
COPY package*.json ./
RUN rm -rf node_modules package-lock.json && npm install 
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# เอาไฟล์ไปไว้ที่ Root ปกติเลยครับ
COPY --from=builder /app/dist /usr/share/nginx/html
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8794
CMD ["nginx", "-g", "daemon off;"]