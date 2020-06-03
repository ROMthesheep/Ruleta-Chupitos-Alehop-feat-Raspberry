var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var Gpio = require("onoff").Gpio; //include onoff to interact with the GPIO

var fs = require("fs"); //require filesystem module
var Gpio = require("onoff").Gpio; //include onoff to interact with the GPIO

const path = require("path");

// tema server

app.use("/static", express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

function execute(command) {
  const exec = require("child_process").exec;

  exec(command, (err, stdout, stderr) => {
    process.stdout.write(stdout);
  });
}

server.listen(80, function () {
  console.log("Servidor corriendo en ");
  execute("hostname -I");
});

// tema giop

var LED = new Gpio(4, "out"); //use GPIO pin 4 as output

var pushButton = new Gpio(17, "in", "both"); //use GPIO pin 17 as input, and 'both' button presses, and releases should be handled
const VASO1 = new Gpio(26, "in", "both");
const VASO2 = new Gpio(19, "in", "both");
const VASO3 = new Gpio(13, "in", "both");
const VASO4 = new Gpio(6, "in", "both");
const VASO5 = new Gpio(5, "in", "both");
const VASO6 = new Gpio(11, "in", "both");
const VASO7 = new Gpio(9, "in", "both");
const VASO8 = new Gpio(10, "in", "both");
const VASO9 = new Gpio(21, "in", "both");
const VASO10 = new Gpio(20, "in", "both");
const VASO12 = new Gpio(16, "in", "both");
const VASO13 = new Gpio(12, "in", "both");
const VASO14 = new Gpio(7, "in", "both");
const VASO15 = new Gpio(8, "in", "both");
const VASO16 = new Gpio(25, "in", "both");

var vasos = [
  VASO1,
  VASO2,
  VASO3,
  VASO4,
  VASO5,
  VASO6,
  VASO7,
  VASO8,
  VASO9,
  VASO10,
  VASO12,
  VASO13,
  VASO14,
  VASO15,
  VASO16,
];

io.sockets.on("connection", function (socket) {
  // WebSocket Connection
  var lightvalue = 0; //static variable for current status
  VASO1.watch(function (err, value) {
    //Watch for hardware interrupts on pushButton
    if (err) {
      //if an error
      console.error("There was an error", err); //output error message to console
      return;
    }
    lightvalue = value;
    socket.emit("light", lightvalue); //send button status to client
  });
  socket.on("light", function (data) {
    //get light switch status from client
    // lightvalue = data;
    // if (lightvalue != LED.readSync()) { //only change LED if status has changed
    //   LED.writeSync(lightvalue); //turn LED on or off
    //   console.log(lightvalue);
    // }

    // vasos[data[0]-1].writeSync(data[1]) esto no se xq no va pero seria la clave

    switch (data[0]) {
      case 1:
        LED.writeSync(data[1]);
        break;
      case 2:
        LED.writeSync(data[1]);
        break;
      case 3:
        LED.writeSync(data[1]);
        break;
      case 4:
        LED.writeSync(data[1]);
        break;
      case 5:
        LED.writeSync(data[1]);
        break;
      case 6:
        LED.writeSync(data[1]);
        break;
      case 7:
        LED.writeSync(data[1]);
        break;
      case 8:
        LED.writeSync(data[1]);
        break;
      case 9:
        LED.writeSync(data[1]);
        break;
      case 10:
        LED.writeSync(data[1]);
        break;
      case 11:
        LED.writeSync(data[1]);
        break;
      case 12:
        LED.writeSync(data[1]);
        break;
      case 13:
        LED.writeSync(data[1]);
        break;
      case 14:
        LED.writeSync(data[1]);
        break;
      case 15:
        LED.writeSync(data[1]);
        break;
      case 16:
        LED.writeSync(data[1]);
        break;

      default:
        break;
    }
  });
});

process.on("SIGINT", function () {
  //on ctrl+c
  LED.writeSync(0); // Turn LED off
  LED.unexport(); // Unexport LED GPIO to free resources
  pushButton.unexport(); // Unexport Button GPIO to free resources
  process.exit(); //exit completely
});
