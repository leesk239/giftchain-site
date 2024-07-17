# Use an official Nginx image as the base image
FROM nginx:alpine

# Remove the default Nginx configuration
RUN rm /usr/share/nginx/html/*

# Copy the static website files to the Nginx web directory
COPY . /usr/share/nginx/html
