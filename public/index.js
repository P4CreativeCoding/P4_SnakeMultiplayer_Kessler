var socket = io();
const canvas = document.getElementById("gameCanvas");
const context = canvas.getContext("2d");

const gridScale = 20;

var players = [];
socket.on("updatePlayers", (players) => {
    console.log("Updated players: " + players);
});

socket.on("updateFood", (data) => {
    console.log("Updated food.");
});

function draw(){
    context.background(50, 50, 50);

    for(var player in players){
        if(!player) { continue; }

        context.fill(0, 200, 0);
        context.rect(player.x, player.y, gridScale, gridScale, 5);

        for(var tailPiece in player.tail){
            context.rect(tailPiece.x, tailPiece.y, gridScale, gridScale, 5);
        }
    }
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