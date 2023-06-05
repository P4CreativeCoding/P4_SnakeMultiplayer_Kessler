const express = require('express');
const http = require('http');
const SocketIO = require('socket.io');
const port = 3000;
const app = express();
const server = http.createServer(app);
const io = SocketIO(server);
const gridSize = 35;

var players = {};
var food;

function respawnFood(){
  food = {
    x: Math.round(Math.random() * gridSize),
    y: Math.round(Math.random() * gridSize)
  };

  console.log("food x: " + food.x + " food y: " + food.y);
};

respawnFood();

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

function movePlayer(player){
  var oldPos = {x: player.x, y: player.y};

  if("up" === player.direction)
  {
    player.y -= 1;
  }
  else if("down" === player.direction)
  {
    player.y += 1;
  }
  else if("left" === player.direction)
  {
    player.x -= 1;
  }
  else if("right" === player.direction)
  {
    player.x += 1;
  }

  var oldTail = [];
  for (let i = 0; i < player.tail.length; i++)
  {
      oldTail.push(player.tail[i]);
  }

  for (let i = 0; i < player.tail.length; i++)
  {
      if(i == 0)
      {
        player.tail[i] = oldPos;
          continue;
      }
      
      player.tail[i] = oldTail[i - 1];
  }
};

function collidesWith(a, b){
  return a.x === b.x && a.y === b.y;
};

function bitesSelf(player)
{
    for (var tailPiece in player.tail)
    {
        if(collidesWith(tailPiece, player))
        {
            return true;
        }
    }

    return false;
}

function collidesWithBarrier(player)
{
    return (player.x < 0 || player.x > gridSize) || (player.y < 0 || player.y > gridSize);
}

function resetPlayer(player)
{
    player.x = 18;
    player.y = 18;
    player.score += player.tail.length;
    player.tail = [];
    player.direction = "up";
}

function updatePlayers(){
  for(var id in players){
    var player = players[id];
    if(!player) { continue; }

    movePlayer(player);

    if(bitesSelf(player) || collidesWithBarrier(player))
    {
        resetPlayer(player);
        return;
    }

    console.log("player x: " + player.x + " player y: " + player.y);
    if(collidesWith(player, food)){
      respawnFood();
      player.tail.push({x: -1, y: -1});
    };
  }

  io.emit("updatePlayers", players);
  io.emit("updateFood", food);
};

var updatePlayerIntervalID = setInterval(() => {
  updatePlayers();
}, 250);

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