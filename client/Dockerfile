FROM node:22-alpine

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy all source files
COPY . .

# Expose Vite's default dev server port (5173)
EXPOSE 5173

# Start the Vite dev server
CMD ["npm", "run", "dev"]
