const lobby = require('./lobby');
const io = require('socket.io')();
const pug = require('pug');
const socketapi = {
    io
};

io.on('connection', function(socket) {
    console.log('user connected!');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('new username', (name) => {
        lobby.addPlayer(name);
        console.log(lobby.getPlayers());
        io.emit('new username', lobby.getPlayers());
    });
});

module.exports = socketapi;