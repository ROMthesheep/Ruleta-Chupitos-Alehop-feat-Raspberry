var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO


var fs = require('fs'); //require filesystem module
var Gpio = require('onoff').Gpio; //include onoff to interact with the GPIO


const path = require('path');

// tema server

app.use('/static', express.static('public'));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

server.listen(8080, function() {

  console.log('Servidor corriendo en http://localhost:8080');

});


// tema giop

var LED = new Gpio(4, 'out'); //use GPIO pin 4 as output
var pushButton = new Gpio(17, 'in', 'both'); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
var VASO1 = new Gpio(26, 'in', 'both'); 
var VASO2 = new Gpio(19, 'in', 'both'); 
var VASO3 = new Gpio(13, 'in', 'both'); 
var VASO4 = new Gpio(6, 'in', 'both'); 
var VASO5 = new Gpio(5, 'in', 'both'); 
var VASO6 = new Gpio(11, 'in', 'both'); 
var VASO7 = new Gpio(9, 'in', 'both'); 
var VASO8 = new Gpio(10, 'in', 'both'); 
var VASO9 = new Gpio(21, 'in', 'both'); 
var VASO10 = new Gpio(20, 'in', 'both'); 
var VASO12 = new Gpio(16, 'in', 'both'); 
var VASO13 = new Gpio(12, 'in', 'both'); 
var VASO14 = new Gpio(7, 'in', 'both'); 
var VASO15 = new Gpio(8, 'in', 'both');
var VASO16 = new Gpio(25, 'in', 'both');


io.sockets.on('connection', function (socket) {// WebSocket Connection
  var lightvalue = 0; //static variable for current status
  VASO1.watch(function (err, value) { //Watch for hardware interrupts on pushButton
    if (err) { //if an error
      console.error('There was an error', err); //output error message to console
      return;
    }
    lightvalue = value;
    socket.emit('light', lightvalue); //send button status to client
  });
  socket.on('light', function(data) { //get light switch status from client
    lightvalue = data;
    if (lightvalue != LED.readSync()) { //only change LED if status has changed
      LED.writeSync(lightvalue); //turn LED on or off
    }
  });
});

process.on('SIGINT', function () { //on ctrl+c
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  pushButton.unexport(); // Unexport Button GPIO to free resources
  process.exit(); //exit completely
}); 