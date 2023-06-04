import { SnakeGameClient } from "./SnakeGameClient";

function startClient(){
    var  socket = io();

    const client = new SnakeGameClient(socket);
    client.log();
};

startClient();