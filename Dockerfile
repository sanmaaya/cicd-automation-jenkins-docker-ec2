# Use the official Nginx Alpine image for a lightweight web server
FROM nginx:alpine

# Copy the frontend files to the default Nginx public HTML directory
COPY index.html /usr/share/nginx/html/
COPY style.css /usr/share/nginx/html/
COPY script.js /usr/share/nginx/html/

# Expose port 80 to allow external HTTP traffic
EXPOSE 80
