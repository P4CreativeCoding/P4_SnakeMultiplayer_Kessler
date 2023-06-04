import { SnakeGameClient } from "../classes.js";

function startClient(){
    var  socket = io();

    const client = new SnakeGameClient(socket);
    client.log();
};

startClient();