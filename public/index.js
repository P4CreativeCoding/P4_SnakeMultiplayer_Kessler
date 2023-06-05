var socket = io();

var gameSize;
var gridSize;
var tileSize;
var cupcakeImage;
var players;
var food;

socket.on("updatePlayers", (data) => {
    console.log("Updated players");
    players = data;
});

socket.on("updateFood", (data) => {
    console.log("Updated food.");
    food = data;
});

function setup(){
    gameSize = 700;
    gridSize = 35;
    tileSize = gameSize / gridSize;

    createCanvas(gameSize, gameSize);
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
        line(linePos, 0, linePos, canvas.height);
        line(0, linePos, canvas.height, linePos);

        linePos = linePos + tileSize;
    }
};

function drawPlayers(){
    for(var id in players){
        if(!players[id]) { continue; }

        fill(players[id].color.r, players[id].color.g, players[id].color.b);
        rect(players[id].x * tileSize, players[id].y * tileSize, tileSize, tileSize, 5);

        for(var tailPiece in players[id].tail){
            rect(tailPiece.x, tailPiece.y, tileSize, tileSize, 5);
        }
    }
};

function drawFood(){
    image(cupcakeImage, food.x, food.y, tileSize, tileSize);
};

function drawScore(){

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