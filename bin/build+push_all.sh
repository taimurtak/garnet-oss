#!/bin/bash

#assuming root directory

echo "Building backend image..."

cd ./backend
docker build -t garnetlabs/garnet-oss-backend . -f dev.Dockerfile
wait
echo "Backend image built ✅"

echo "Building frontend image..."

cd ../frontend
docker build -t garnetlabs/garnet-oss-frontend . -f dev.Dockerfile
wait
echo "Frontend image built ✅"

echo "Pushing backend and frontend images DockerHub"
docker push garnetlabs/garnet-oss-backend
docker push garnetlabs/garnet-oss-frontend
echo "Images pushed ✅"
