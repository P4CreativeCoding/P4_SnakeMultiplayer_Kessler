module.exports = function(app, server, io) {
    this.app = app;
    this.server = server;
    this.io = io;
    
    this.players = new Set();

    this.onClientConnection = function(socket) {
        console.log("A user connected: " + socket.id);
        this.players.add(socket.id);
  
        socket.on("disconnect", () => {
          console.log("A user disconnected: " + socket.id);
        });
    };

    this.io.on("connection", this.onClientConnection);

};