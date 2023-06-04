const { SnakeGameClient } = require("./SnakeGameClient");

function startClient(){
    var  socket = io();

    const client = new SnakeGameClient(socket);
    SGC.log();
};

startClient();