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
        if(!player[id]) { 
            console.log("Empty player");
            continue; 
        }

        console.log("id: " + id);
        console.log("x: " + player[id].x);
        console.log("y: " + player[id].y);
        console.log("tail: " + player[id].tail);
        console.log("score: " + player[id].score);

        fill(0, 200, 0);
        rect(player[id].x, player[id].y, tileSize, tileSize, 5);

        for(var tailPiece in player[id].tail){
            rect(tailPiece.x, tailPiece.y, tileSize, tileSize, 5);
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