const express = require('express');
const app = express();
// const httpServer = require('http').createServer(app);
// const io = require('socket.io')(httpServer);

const port = 3000;

app.get('/', (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, (req, res) => {
  console.log('Example app listening on port ${port}');
  res.send('Example app listening on port ${port}');
});

app.post('/', (req, res) => {
  res.send("Got a post request.");
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
