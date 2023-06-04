const express = require('express');
const http = require('http');
const SocketIO = require('socket.io');
const port = 3000;
const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

var players = [];

function createNewPlayer(socket){
  players.push({
    id: socket.id,
    x: 0,
    y: 0,
    tail: []
  });
};

function deletePlayer(){
  for(var i = this.players.length - 1; i >= 0; i--){
    if(players[i].id == socket.id){
        players.slice(i, 1);
    }
  }
};

function updatePlayers(){
  io.emit("updatePlayers", players);
};

var updatePlayerIntervalID = setInterval(() => {
  updatePlayers();
}, 1000);

app.get('/', (res) => {
  res.sendFile(__dirname + "/index.html")
});

app.use(express.static("public"));

onClientConnected = function(socket) {
    createNewPlayer();

    socket.on("disconnect", () => {
      deletePlayer(socket);
    });
};

io.on("connection", (socket) => {
    onClientConnected(socket);
});

server.listen(port, () => {
    console.log('Example app listening on port' + port);
});