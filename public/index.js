var socket = io();

var gameSize;
var gridSize;
var tileSize;
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

        linePos += tileSize;
    }
};

function drawPlayers(){
    for(var id in players){
        var player = players[id];
        if(!player) { continue; }

        fill(player.color.r, player.color.g, player.color.b);
        rect(player.x * tileSize, player.y * tileSize, tileSize, tileSize, 5);

        console.log(player.tail.length);
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