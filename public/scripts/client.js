const socket = io('localhost:3000', {autoConnect: false});

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

socket.onAny((event, ...args) => {
    console.log(event, args);
});