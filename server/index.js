const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST']
    }
});

const messages = [];

io.on('connection', (socket) => {
    const users = [];
    for (let [id, socket] of io.of('/').sockets) {
        users.push({
            userID: id,
            username: socket.username,
        });
    }
    socket.emit('users', users);
    socket.emit('messages', messages);

    socket.broadcast.emit('user connected', {
        userID: socket.id,
        username: socket.username,
        isReady: false,
    });

    socket.on('user ready', user => {
        io.emit('user ready', user);
    });
    
    socket.on('new message', message => {
        messages.push(message);
        io.emit('new message', message);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user disconnected');
    });
});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
        return next(new Error('Invalid username!'));
    }
    socket.username = username;
    next();
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`server listening at http://localhost:${PORT}`);
});