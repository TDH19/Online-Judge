# Use Node.js Alpine base image for smaller size
FROM node:18-alpine

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first (for caching npm install)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all other files (source code)
COPY . .

# Expose the port your API listens on
EXPOSE 3000

# Start the API
CMD ["npm", "run" , "dev"]
