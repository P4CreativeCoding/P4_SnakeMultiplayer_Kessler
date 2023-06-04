var  socket = io();

const gridScale = 20;

var players = [];
socket.on("updatePlayers", (players) => {
    console.log("Updated players: " + players);
});

socket.on("updateFood", (data) => {
    console.log("Updated food.");
});

function draw(){
    background(50, 50, 50);

    for(var player in players){
        if(!player) { continue; }

        fill(0, 200, 0);
        rect(player.x, player.y, gridScale, gridScale, 5);

        for(var tailPiece in player.tail){
            rect(tailPiece.x, tailPiece.y, gridScale, gridScale, 5);
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