module.exports = function(app, server, io) {
    this.app = app;
    this.server = server;
    this.io = io;
    
    this.players = [];

    this.onClientConnected = function(socket) {
        console.log("A user connected: " + socket.id);
        this.players.push({id: socket.id});
  
        socket.on("disconnect", () => {
          console.log("A user disconnected: " + socket.id);

          for(var i = 0; i < this.players.length; i++){
            if(this.players[i].id == socket.id){
                this.players.slice(i, 1);
                break;
            }
          }
        });
    };

    this.io.on("connection", (socket) => {
        this.onClientConnected(socket);
    });

};