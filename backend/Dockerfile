# Use Node.js 18 Alpine as the base image
FROM node:18-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all application files
COPY . .

# Create a directory for SQLite database
RUN mkdir -p /app/data

# Expose port 5000
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
