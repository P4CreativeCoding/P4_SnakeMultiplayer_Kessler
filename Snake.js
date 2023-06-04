module.exports = function() {
    function log(){
        console.log("Snake");
    }
};

// const express = require('express');
// const app = express();
// const server = require('http').Server(app);
// const io = require('socket.io')(server);

// const port = 3000;
// const gridSize = 20;
// const width = 800;
// const height = 600;

// app.use(express.static('public'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// server.listen(port, () => {
//   console.log(`Server is running on http://localhost:${port}`);
// });

// const players = {};

// io.on('connection', (socket) => {
//   console.log('New player connected');

//   // Create a new player
//   players[socket.id] = {
//     x: Math.floor(Math.random() * gridSize) * gridSize,
//     y: Math.floor(Math.random() * gridSize) * gridSize,
//     direction: 'right',
//     score: 0,
//   };

//   // Send the initial game state to the new player
//   socket.emit('initialState', { players, gridSize, width, height });

//   // Update the game state when a player moves
//   socket.on('move', (direction) => {
//     const player = players[socket.id];
//     player.direction = direction;
//   });

//   // Remove the player when they disconnect
//   socket.on('disconnect', () => {
//     console.log('Player disconnected');
//     delete players[socket.id];
//   });
// });

// Update the game state and send it to all players
// setInterval(() => {
//   for (const playerId in players) {
//     const player = players[playerId];

//     // Move the player
//     if (player.direction === 'up') player.y -= gridSize;
//     else if (player.direction === 'down') player.y += gridSize;
//     else if (player.direction === 'left') player.x -= gridSize;
//     else if (player.direction === 'right') player.x += gridSize;

//     // Check for collision with the boundaries
//     if (
//       player.x < 0 ||
//       player.x >= width ||
//       player.y < 0 ||
//       player.y >= height
//     ) {
//       // Game over
//       delete players[playerId];
//       continue;
//     }

//     // Check for collision with other players
//     for (const otherPlayerId in players) {
//       const otherPlayer = players[otherPlayerId];
//       if (
//         otherPlayerId !== playerId &&
//         otherPlayer.x === player.x &&
//         otherPlayer.y === player.y
//       ) {
//         // Game over
//         delete players[playerId];
//         break;
//       }
//     }
//   }

//   // Send the updated game state to all players
//   io.emit('updateState', players);
// }, 1000 / 10);
