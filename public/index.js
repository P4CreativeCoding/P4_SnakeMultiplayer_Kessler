var socket = io();

var gameHeight;
var gameWidth;
// var frameRate;
var gridSize;
var cupcakeImage;
var players;

socket.on("updatePlayers", (players) => {
    console.log("Updated players: " + players);
});

socket.on("updateFood", (data) => {
    console.log("Updated food.");
});

function setup(){
    gameHeight = 700;
    gameWidth = 700;
    gridSize = 20;
    players = [];

    createCanvas(gameHeight, gameWidth);
    // frameRate(frameRate);
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

        linePos = linePos + gridSize;
    }
};

function drawPlayers(){
    for(var player in players){
        if(!player) { continue; }

        fill(0, 200, 0);
        rect(player.x, player.y, gridScale, gridScale, 5);

        for(var tailPiece in player.tail){
            rect(tailPiece.x, tailPiece.y, gridScale, gridScale, 5);
        }
    }
};

function drawFood(){

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
        socket.emit("changeMoveDirection", "up");
    }
    else if(DOWN_ARROW === keyCode || 's' === keyCode){
        socket.emit("changeMoveDirection", "down");
    }
    else if(LEFT_ARROW === keyCode || 'a' === keyCode){
        socket.emit("changeMoveDirection", "left");
    }
    else if(RIGHT_ARROW === keyCode || 'd' === keyCode){
        socket.emit("changeMoveDirection", "right");
    }
};