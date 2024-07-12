# syntax=docker/dockerfile:1

# Comments are provided throughout this file to help you get started.
# If you need more help, visit the Dockerfile reference guide at
# https://docs.docker.com/engine/reference/builder/

ARG NODE_VERSION=20.12.0

# syntax=docker/dockerfile:1

# Base image
FROM node:${NODE_VERSION}-alpine as build
LABEL stage=builder

# Use a specific node environment
ENV NODE_ENV=production
# Add ARG for REACT_APP_BACKEND_URL 
ARG REACT_APP_BACKEND_URL

# Set it as ENV so it can be used in the application
ENV REACT_APP_BACKEND_URL=${REACT_APP_BACKEND_URL}
# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Ensure permissions are correct and install dependencies including 'devDependencies'.
# This also benefits from Docker's layer caching.
RUN npm install --include=dev

# Copy the rest of the source files into the image.
COPY . .

# Build the application
RUN npm run build

# Prune development dependencies for production.
RUN npm prune --production

# List build directory to debug
RUN ls -al /usr/src/app 
# Second stage: Setup Nginx to serve the React app
FROM nginx:alpine
# Copy built static files from builder stage.
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the port nginx is reachable on
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]





















# FROM node:${NODE_VERSION}-alpine as build

# # Use production node environment by default.
# ENV NODE_ENV production

# WORKDIR /usr/src/app

# # Download dependencies as a separate step to take advantage of Docker's caching.
# # Leverage a cache mount to /root/.npm to speed up subsequent builds.
# # Leverage a bind mounts to package.json and package-lock.json to avoid having to copy them into
# # into this layer.

# RUN --mount=type=bind,source=package.json,target=package.json \
#     --mount=type=bind,source=package-lock.json,target=package-lock.json \
#     --mount=type=cache,target=/root/.npm \
#     chmod +rw package-lock.json \
#     npm install --include=dev


# # Run the application as a non-root user.
# USER node

# # Copy the rest of the source files into the image.
# COPY . .
# RUN npm run build
# RUN npm prune --production




# FROM nginx:alpine
# COPY --from=build /usr/src/app/build /usr/share/nginx/html
# EXPOSE 80

# CMD ["nginx", "-g", "daemon off;"]

