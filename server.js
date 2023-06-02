// const express = require('express');
// const path = require('path');

// const app = express();
// const port = process.env.PORT || 3000;

// // Serve static files from the "public" directory
// app.use(express.static(path.join(__dirname, 'public')));

// // Handle requests to the root URL
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);

const port = 3000;

app.use(express.static('public'));

// Handle client connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle messages from the client
  socket.on('message', (data) => {
    console.log('Received message:', data);

    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Handle disconnections
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

httpServer.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
