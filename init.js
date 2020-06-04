var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var Gpio = require("onoff").Gpio;
var fs = require("fs"); 

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

const VASO1 = new Gpio(26, "out");
const VASO2 = new Gpio(19, "out");
const VASO3 = new Gpio(13, "out");
const VASO4 = new Gpio(6, "out");
const VASO5 = new Gpio(5, "out");
const VASO6 = new Gpio(11, "out");
const VASO7 = new Gpio(9, "out");
const VASO8 = new Gpio(10, "out");
const VASO9 = new Gpio(21, "out");
const VASO10 = new Gpio(20, "out");
const VASO11 = new Gpio(16, "out");
const VASO12 = new Gpio(12, "out");
const VASO13 = new Gpio(7, "out");
const VASO14 = new Gpio(8, "out");
const VASO15 = new Gpio(25, "out");
const VASO16 = new Gpio(24, "out");

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
    if (err) {
      //if an error
      console.error("There was an error", err); //output error message to console
      return;
    }
  });
  socket.on("light", function (data) {

    // vasos[data[0]-1].writeSync(data[1]) esto no se xq no va pero seria la clave
    

    switch (data[0]) {
      case 1:
        VASO1.writeSync(data[1]);
        break;
      case 2:
        VASO2.writeSync(data[1]);
        break;
      case 3:
        VASO3.writeSync(data[1]);
        break;
      case 4:
        VASO4.writeSync(data[1]);
        break;
      case 5:
        VASO5.writeSync(data[1]);
        break;
      case 6:
        VASO6.writeSync(data[1]);
        break;
      case 7:
        VASO7.writeSync(data[1]);
        break;
      case 8:
        VASO8.writeSync(data[1]);
        break;
      case 9:
        VASO9.writeSync(data[1]);
        break;
      case 10:
        VASO10.writeSync(data[1]);
        break;
      case 11:
        VASO11.writeSync(data[1]);
        break;
      case 12:
        VASO12.writeSync(data[1]);
        break;
      case 13:
        VASO13.writeSync(data[1]);
        break;
      case 14:
        VASO14.writeSync(data[1]);
        break;
      case 15:
        VASO15.writeSync(data[1]);
        break;
      case 16:
        VASO16.writeSync(data[1]);
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
