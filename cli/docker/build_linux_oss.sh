#!/bin/bash

echo "Building CLI linux image (oss)..."
cd ..
echo ls
docker build -t garnetlabs/cli:0.0.3-linux-oss . -f ./docker/linux.Dockerfile
wait
echo "CLI linux image built ✅"

echo "Pushing image to repo garnetlabs/cli"
docker push garnetlabs/cli:0.0.3-linux-oss
echo "CLI linux image pushed ✅"
