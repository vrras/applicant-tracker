# Stage 1: Build
FROM node:20.17.0 AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json tsconfig.json ./
RUN npm install

# Copy the rest of the application files
COPY . .

# Generate Prisma client and build the TypeScript application
RUN npx prisma generate && npm run build

# Stage 2: Production
FROM node:20.17.0

WORKDIR /app

# Set NODE_ENV for production
ENV NODE_ENV=production

# Copy package files and install all dependencies
COPY --from=build /app/package.json /app/package-lock.json ./
RUN npm install --omit=dev

# Copy necessary files from build stage
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY --from=build /app/prisma ./prisma

# Expose the port
EXPOSE 3002

# Start the application
CMD ["node", "dist/server.js"]
