const io = require('socket.io')();
const socketapi = {
    io
};

io.on('connection', function(socket) {
    console.log('user connected!');
});

module.exports = socketapi;