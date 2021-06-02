#!/bin/bash

#assuming root directory

echo "Cleaning up..."

cd ./backend
rm -rf node_modules
rm -rf dist
rm -rf package-lock.json

echo "Cleanup done ✅"
