#!/bin/bash


echo "Starting backend..."
cd ./ChatRoom.API
dotnet watch run &


echo "Starting RabbitMQ with Docker..."
cd ..
docker-compose up -d rabbitmq

#wait for rabbit start, if not, bot start fail
sleep 5


echo "Starting bot..."
cd ./ChatRoom.StockBot
dotnet watch run &


echo "Starting frontend..."
cd ../frontend
npm run dev &

echo "All services running!"

# Keep services running
wait
