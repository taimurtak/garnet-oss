#!/bin/bash

#assuming root directory

echo "Initializing DB for local development..."

cd ./backend
npm install && npm run create:db

echo "Initialized DB for local development ✅"
