function startClient(){
    var  socket = io();

    const SnakeGameClient = require("./SnakeGameClient");
    const SGC = new SnakeGameClient(socket);
    SGC.log();
};

startClient();