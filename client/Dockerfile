# Build stage
FROM node:22-alpine AS builder
WORKDIR /app
ARG VITE_API_BASE
ENV VITE_API_BASE=$VITE_API_BASE

ARG IOT_SERVICE_BASE_URL
ENV VITE_IOT_SERVICE_BASE_URL=$IOT_SERVICE_BASE_URL

COPY package*.json ./
RUN rm -rf node_modules package-lock.json && npm install 
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
# สร้างโฟลเดอร์สำหรับพาร์ท /booking
RUN mkdir -p /usr/share/nginx/html/booking
# Copy built files ไปไว้ทั้งที่ Root และในพาร์ท /booking
COPY --from=builder /app/dist /usr/share/nginx/html
COPY --from=builder /app/dist /usr/share/nginx/html/booking
# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8794
CMD ["nginx", "-g", "daemon off;"]