module.exports = function(socket) {
    this.socket = socket;

    this.log = function() {
        console.log("SnakeGameClient");
    }
};