module.exports = function(app, server, io) {
    this.app = app;
    this.server = server;
    this.io = io;
    
    this.players = [];

    this.onClientConnection = function(socket) {
        console.log("A user connected: " + socket.id);
        this.players.push(socket.id);
  
        socket.on("disconnect", () => {
          console.log("A user disconnected: " + socket.id);
          this.players.splice(this.players.indexOf(socket.id), 1);
        });
    };

    this.io.on("connection", this.onClientConnection);

};