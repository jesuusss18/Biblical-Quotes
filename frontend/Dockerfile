# --- Build stage ---
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

# Accept build argument
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copy source code
COPY . .

# Build Vite app
RUN npm run build

# --- Production stage (Nginx) ---
FROM nginx:alpine

# Copy built files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
