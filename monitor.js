const http = require("http");
const os = require("os");
const path = require("path");

var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});

var Express = require("express");
var SocketIO = require("socket.io");

var application = new Express();
var server = new http.Server(application);
var io = new SocketIO(server);

application.use(Express.static(path.join(__dirname, "/app")));
application.use("/vendor", Express.static(__dirname + "/node_modules/"));



board.on("ready", () => {

  var clients = new Set();
  
  var monitor = new five.Multi({
    controller: "BME280"
  });

  var updated = Date.now() - 5000;

  monitor.on("change", () =>  {
    var now = Date.now();
    if (now - updated >= 5000) {
      updated = now;
    }    

    clients.forEach(recipient => {
      recipient.emit("report", {
        thermometer: monitor.thermometer.fahrenheit,
        barometer: monitor.barometer.pressure,
        hygrometer: monitor.hygrometer.relativeHumidity,
        altimeter: monitor.altimeter.meters,
      });
    });
  }); 
  
  io.on("connection", socket => {
    if (clients.size < 5) {
      clients.add(socket);

      socket.on("disconnect", () => clients.delete(socket));
    }
  });

  var port = 3000;
  server.listen(port, () => {
    console.log(`http://${os.networkInterfaces().wlan0[0].address}:${port}`);
  });

  process.on("SIGINT", () => {
    server.close();
  });
});


