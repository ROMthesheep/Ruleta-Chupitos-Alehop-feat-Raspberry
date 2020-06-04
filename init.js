var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);
var Gpio = require("onoff").Gpio; //include onoff to interact with the GPIO

var fs = require("fs"); //require filesystem module
const path = require("path");

// tema server

app.use("/static", express.static("public")); //Creacion del directorio static para acceder a recursos como js, css, etc

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

//Bloque para poder ejecutar comandos por consola, en gran parte para poder mostrar por terminal el hostname -I

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

// var vasos = [
//   VASO1,
//   VASO2,
//   VASO3,
//   VASO4,
//   VASO5,
//   VASO6,
//   VASO7,
//   VASO8,
//   VASO9,
//   VASO10,
//   VASO12,
//   VASO13,
//   VASO14,
//   VASO15,
//   VASO16,
// ];

io.sockets.on("connection", function (socket) {
  // WebSocket Connection
  
  socket.on("light", function (data) { //Funcion llamada light, esta funcion se encarga de ir apagando o encendiendo los leds

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
  //on ctrl+c apagamos y desconectamos los recursos
  VASO1.writeSync(0);
  VASO2.writeSync(0);
  VASO3.writeSync(0);
  VASO4.writeSync(0);
  VASO5.writeSync(0);
  VASO6.writeSync(0);
  VASO7.writeSync(0);
  VASO8.writeSync(0);
  VASO9.writeSync(0);
  VASO10.writeSync(0);
  VASO11.writeSync(0);
  VASO12.writeSync(0);
  VASO13.writeSync(0);
  VASO14.writeSync(0);
  VASO15.writeSync(0);
  VASO16.writeSync(0);

  VASO1.unexport();
  VASO2.unexport();
  VASO3.unexport();
  VASO4.unexport();
  VASO5.unexport();
  VASO6.unexport();
  VASO7.unexport();
  VASO8.unexport();
  VASO9.unexport();
  VASO10.unexport();
  VASO11.unexport();
  VASO12.unexport();
  VASO13.unexport();
  VASO14.unexport();
  VASO15.unexport();
  VASO16.unexport();

  process.exit(); //exit completely
});
