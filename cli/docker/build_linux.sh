#!/bin/bash

echo "Building CLI linux image (hosted)..."
cd ..
echo ls
docker build -t garnetlabs/cli:0.0.2-linux . -f ./docker/linux.Dockerfile
wait
echo "CLI linux image built ✅"

echo "Pushing image to repo garnetlabs/cli"
docker push garnetlabs/cli:0.0.2-linux
echo "CLI linux image pushed ✅"
