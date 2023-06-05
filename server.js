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
    color: {r: Math.round(Math.random() * 255), g: Math.round(Math.random() * 255), b: Math.round(Math.random() * 255)},
    direction: "up"};
};

function deletePlayer(socket){
  delete players[socket.id];
};

function updatePlayers(){
  for(var id in players){
    var player = players[id];
    if(!player) { continue; }

    var oldPosX = player.x
    var oldPosY = player.y;

    if("up" === player.direction)
    {
      player.y += 1;
    }
    else if("down" === player.direction)
    {
      player.y -= 1;
    }
    else if("left" === player.direction)
    {
      player.x -= 1;
    }
    else if("right" === player.direction)
    {
      player.x += 1;
    }
  }

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

    socket.on("direction", (direction) => {
      if(players[socket.id]){
        players[socket.id].direction = direction;
      }
    });
};

io.on("connection", (socket) => {
    onClientConnected(socket);
});

server.listen(port, () => {
    console.log('Example app listening on port' + port);
});