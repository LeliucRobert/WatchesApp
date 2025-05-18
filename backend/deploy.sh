#!/bin/bash
echo "📦 Pulling latest image..."
docker-compose pull

echo " Restarting app..."
docker-compose down
docker-compose up 
#docker-compose up -d
echo " Deployed latest version!"

