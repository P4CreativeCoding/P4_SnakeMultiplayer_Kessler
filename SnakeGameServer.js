module.exports = function(app, server, io) {
    this.app = app;
    this.server = server;
    this.io = io;

    this.io.on("connection", this.onClientConnection);
    
    this.playList = new Map();

    this.onClientConnection = function() {
        console.log("A user connected: ");
  
        socket.on("disconnect", () => {
          console.log("A user disconnected: ");
        });
    };
};