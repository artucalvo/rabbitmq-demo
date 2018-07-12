#!/usr/bin/env node

// Require AMQP protocol library
var amqp = require('amqplib/callback_api');
var queue = 'gdg_queue'; // Queue name

// Connect to RabbitMQ server
amqp.connect('amqp://localhost', function(err, conn) {

  // Create channel where the API methods are
  conn.createChannel(function(err, channel) { 
    channel.assertQueue(queue, {durable: true}); // Connect to queue. Message won't be lost
    channel.prefetch(1); //// Avoid round-robin. Don't receive message if too busy
    // Worker(s) will eventually pick the tasks and execute them - there are no timeouts
    channel.consume(queue, function(message) {
      setTimeout(function() { //// Pretend to be doing a time consuming task
        console.log("Capitalized message: " + message.content.toString().toUpperCase());
        channel.ack(message); // Send ACK so that it doesn't need to resend.
        // RabbitMQ will redeliver the message only when the consumer dies.
        // There aren't any message timeouts, even if processing takes a very long time
      }, Math.floor(Math.random() * 10) * 1000); //// // Wait a random amount of time
    }, {noAck: false});
  });
});
