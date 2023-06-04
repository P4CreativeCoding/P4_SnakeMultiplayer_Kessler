const express = require('express');
const http = require('http');
const SocketIO = require('socket.io');
const port = 3000;

function startServer(){
  const app = express();
  const server = http.createServer(app);
  const io = SocketIO(server);

  server.listen(port, () => {
    console.log('Example app listening on port' + port);
  });

  app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
    console.log("get()");
  });

  app.use(express.static("public"));

  const snakeGameServer = require("./public/SnakeGameServer");
  const SGS = new snakeGameServer(app, server, io);

  console.log("Started Snake Game Server!");
};

startServer();