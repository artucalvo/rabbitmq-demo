#!/usr/bin/env node

// Require AMQP library. RabbitMQ supports STOMP, MQTT and HTTP as well
var amqp = require('amqplib/callback_api');
// Require library to generate random words
var randomWords = require('random-words');
var queue = 'gdg_queue'; // Queue name

// Connect to RabbitMQ via AMQP protocol
amqp.connect('amqp://localhost', function(err, conn) {

	// Create a channel in order to invoque API methods
  	conn.createChannel(function(err, ch) {  		
	    var count = 0;
	    // Declare a queue that will persist even if RabbitMQ goes down
	    ch.assertQueue(queue, {durable: true});

	    var task = setInterval(function() { // Create messages in a loop
	      // The tasks are byte arrays where we can encode anything 
	      var message = {
                "id": (++count),
                "word": randomWords()
    	      }

	      // Send the message to the queue. The message will persist even if RabbitMQ goes down
	      ch.sendToQueue(queue, new Buffer(JSON.stringify(message)), {persistent: true});
	      console.log('Message sent: ' + JSON.stringify(message)); 
	    }, 3000);
	//  clearInterval(task);
  	});
  	// Close the connection and exit
        // setTimeout(() => { conn.close(); process.exit(0) }, 500);
});
