#!/bin/bash

#assuming root directory
echo "Building backend image..."

cd ./backend
docker build -t garnetlabs/garnet-oss-backend:latest . -f dev.Dockerfile
# docker build -t garnetlabs/garnet-oss-backend:0.0.3 . -f dev.Dockerfile
wait
echo "Backend image(s) built ✅"

echo "Building frontend image..."

cd ../frontend
docker build -t garnetlabs/garnet-oss-frontend:latest . -f dev.Dockerfile
# docker build -t garnetlabs/garnet-oss-frontend:0.0.3 . -f dev.Dockerfile
wait
echo "Frontend image(s) built ✅"