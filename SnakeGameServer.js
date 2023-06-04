module.exports = function(app, server, io) {
    this.app = app;
    this.server = server;
    this.io = io;
    
    this.playersSet = new Set();
    this.playersMap = new Map();
    this.playerArray = [];

    this.onClientConnected = function(socket) {
        console.log("A user connected: " + socket.id);
        this.playersArray.push(socket.id);
        this.playersSet.add(socket.id);
        this.playersMap.add(socket.id);
  
        socket.on("disconnect", () => {
          console.log("A user disconnected: " + socket.id);
        });
    };

    this.io.on("connection", (socket) => {
        this.onClientConnected(socket);
    });

};