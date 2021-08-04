const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:8080',
    }
});

io.on('connection', (socket) => {
    const users = [];
    for (let [id, socket] of io.of('/').sockets) {
        users.push({
            userID: id,
            username: socket.username,
        });
    }
    socket.emit('users', users);

    socket.broadcast.emit('user connected', {
        userID: socket.id,
        username: socket.username,
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`);
});