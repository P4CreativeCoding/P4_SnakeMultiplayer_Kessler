import { SnakeGameClient } from "../public/SnakeGameClient.js";

function startClient(){
    var  socket = io();

    const client = new SnakeGameClient(socket);
    client.log();
};

startClient();