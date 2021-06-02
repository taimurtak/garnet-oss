FROM node:14-alpine 
WORKDIR /app

# Copy packages
COPY ./frontend/ /app/frontend
COPY ./backend/ /app/backend
ADD garnet-preview.config.yml /app/

# Install packages
RUN cd ./frontend \
    && npm install \
    && cd ../backend \
    && npm install 
# Install PM2 
RUN npm install -g pm2@4.5.6

# Expose ports
EXPOSE 3000
EXPOSE 8080
# Start PM2 and spawn backend and frontend as seperate node processes
CMD ["pm2-runtime", "/app/garnet-preview.config.yml"]