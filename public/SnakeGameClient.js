// module.exports = function(socket) {
//     this.socket = socket;

//     this.log = function() {
//         console.log("SnakeGameClient");
//     }
// };

export class SnakeGameClient {
    constructor(socket){
        this.socket = socket;
    };

    log(){
        console.log("Client");
    };
};