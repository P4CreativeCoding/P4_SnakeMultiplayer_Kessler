var socket = io();

var gameSize;
var gridSize;
var tileSize;
var scoreboardSize;
var cupcakeImage;
var players;
var food;

socket.on("updatePlayers", (data) => {
    players = data;
});

socket.on("updateFood", (data) => {
    food = data;
});

function setup(){
    gameSize = 700;
    gridSize = 35;
    scoreboardSize = 200;
    tileSize = gameSize / gridSize;

    createCanvas(gameSize + scoreboardSize, gameSize);
    image(cupcakeImage, 0, 0)
};

function preload(){
    cupcakeImage = loadImage("CupCake.png");
};

function drawGrid(){
    background(50, 50, 50);
    
    var linePos = 0;
    while (linePos <= canvas.width)
    {
        line(linePos, 0, linePos, gameSize);
        line(0, linePos, gameSIze, linePos);

        linePos += tileSize;
    }
};

function drawPlayers(){
    for(var id in players){
        var player = players[id];
        if(!player) { continue; }

        fill(player.color.r, player.color.g, player.color.b);
        rect(player.x * tileSize, player.y * tileSize, tileSize, tileSize, 5);

        for(let i = 0; i < player.tail.length; i++){
            rect(player.tail[i].x * tileSize, player.tail[i].y * tileSize, tileSize, tileSize, 5);
        }
    }
};

function drawFood(){
    if(!food) { return; }
    image(cupcakeImage, food.x * tileSize, food.y * tileSize, tileSize, tileSize);
};

function drawScore(){
    fill("white");
    rect(gameSize, 0, scoreboardSize, gameSize);

    fill("black");
    textSize(25);
    text("Scoreboard", gameSize, 30);

    var index = 0;
    for(var id in players){
        var player = players[id];

        if(!player) { continue; }

        var height = 35;
        var padding = 5;
        var posY = ++index * 30;

        fill(player.color.r, player.color.g, player.color.b);
        rect(gameSize, posY, height, height, 5);
        text(player.score, gameSize + height + padding, posY + height);
    };
};

function draw(){
    drawGrid();
    drawPlayers();
    drawFood();
    drawScore();
};

function keyPressed(){
    if(UP_ARROW === keyCode || 'w' === keyCode){
        socket.emit("direction", "up");
    }
    else if(DOWN_ARROW === keyCode || 's' === keyCode){
        socket.emit("direction", "down");
    }
    else if(LEFT_ARROW === keyCode || 'a' === keyCode){
        socket.emit("direction", "left");
    }
    else if(RIGHT_ARROW === keyCode || 'd' === keyCode){
        socket.emit("direction", "right");
    }
};