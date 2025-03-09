# Stage 1: Build
FROM node:16 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY .env.example .env
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine

# Copy the build files to the nginx server
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start the nginx server
CMD ["nginx", "-g", "daemon off;"]