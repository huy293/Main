# Use Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all files
COPY . .

# Create .env file from environment variables
RUN echo "NODE_ENV=\${NODE_ENV}\n\
PORT=\${PORT}\n\
DB_HOST=\${DB_HOST}\n\
DB_PORT=\${DB_PORT}\n\
DB_USER=\${DB_USER}\n\
DB_PASSWORD=\${DB_PASSWORD}\n\
DB_NAME=\${DB_NAME}\n\
CORS_ORIGIN=\${CORS_ORIGIN}\n\
JWT_SECRET=\${JWT_SECRET}\n\
JWT_EXPIRES_IN=\${JWT_EXPIRES_IN}" > .env

# Expose port 8888
EXPOSE 8888

# Start the application
CMD ["npm", "start"]
