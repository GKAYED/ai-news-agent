FROM node:20-alpine

# Install build dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++

# Create app directory
WORKDIR /usr/src/app

# Install dependencies first (uses package.json)
COPY package.json ./
RUN npm install --production && npm cache clean --force

# Bundle app source
COPY . .

# Expose web server port
EXPOSE 3000

# Create data directory for SQLite
RUN mkdir -p /usr/src/app/data

# Default to running the web server
CMD ["node", "src/server.js"]
