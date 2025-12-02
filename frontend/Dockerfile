# --- Build Stage ---
FROM node:18-alpine AS builder
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Accept build argument for backend URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Copy all frontend source files
COPY . .

# Build frontend
RUN npm run build

# --- Production Stage ---
FROM nginx:alpine
# Copy built files to Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
