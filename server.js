const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const { Server } = require('socket.io');
const io = new Server(httpServer);

const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
});

io.on("connection", (socket) => {
  console.log("A user connected: ");

  socket.on("disconnect", () => {
    console.log("A user disconnected: ");
  });
});

httpServer.listen(port, (req, res) => {
  console.log('Example app listening on port' + port);
});

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
