FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install

FROM nginx:alpine

# Copy all frontend files
COPY . /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
