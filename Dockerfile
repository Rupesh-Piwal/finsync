# FROM node:18-alpine

# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .

# RUN npm run build
# ENV NEXTAUTH_URL=http://localhost:3000
# ENV AUTH_TRUST_HOST=true

# EXPOSE 3000

# CMD ["npm", "start"]


# Use Node.js 18 Alpine for a smaller image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

ENV NODE_ENV=development  
ENV ARCJET_KEY=ajkey_01jr6a8ckpfh8b9aqkf1fqb0gw

# Expose port 3000 for Next.js
EXPOSE 3000

# Start Next.js in development mode
CMD ["npm", "run", "dev"]
