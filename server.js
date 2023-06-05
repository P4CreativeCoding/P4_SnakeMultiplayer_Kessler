const express = require('express');
const http = require('http');
const SocketIO = require('socket.io');
const port = 3000;
const app = express();
const server = http.createServer(app);
const io = SocketIO(server);

class Player{
  constructor(id, x, y, tail, score){
    this.id = id;
    this.x = x;
    this.y = y;
    this.tail = tail;
    this.score = score;
  };
};

var players = {};

function createNewPlayer(socket){
  players[socket.id] = {
    x: 18, 
    y: 18, 
    tail: [], 
    score: 0, 
    color: {r: Math.round(Math.random() * 255), g: Math.round(Math.random() * 255), b: Math.round(Math.random() * 255)}};
};

function deletePlayer(socket){
  delete players[socket.id];
  // for(var i = players.length - 1; i >= 0; i--){
  //   if(players[i].id == socket.id){
  //       players.slice(i, 1);
  //   }
  // }
};

function updatePlayers(){
  io.emit("updatePlayers", players);
};

var updatePlayerIntervalID = setInterval(() => {
  updatePlayers();
}, 1000);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
});

app.use(express.static("public"));

onClientConnected = function(socket) {
    createNewPlayer(socket);

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