const express = require('express');
const http = require('http');
const { SocketIO } = require('socket.io');
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

  const snakeGameServer = require("./SnakeGameServer");
  const SGS = new snakeGameServer(app, server, io);

  console.log("Started Snake Game Server!");
};

startServer();

// app.use(express.static('public'));

// // Handle client connections
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle messages from the client
//   socket.on('message', (data) => {
//     console.log('Received message:', data);

//     // Broadcast the message to all connected clients
//     io.emit('message', data);
//   });

//   // Handle disconnections
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// httpServer.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });
