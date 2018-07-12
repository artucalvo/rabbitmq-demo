# RabbitMQ demo

## Description
Shows how the producer - queue - consumer flow works, sending messages
to the queue that then are consumed by the worker(s) in a round-robin 
or availability-based way.

## Requirement
- Have docker up an running locally
- Clone this repository to your local device

## Run demo
1. Run RabbitMQ image
`docker run -d --net=host --name rabbitmq rabbitmq`
2. Build the consumer container from the `worker` folder
`docker build -t worker .`
3. Build the producer container from the `producer` folder
`docker build -t producer .
4. Run the worker (as many as you want, changing just the name)
`docker run --net=host --name worker1 worker`
5. Run the producer (as many as you want, changing just the name)
`docker run --net=host --name producer producer`