const game = require('../game/game');
const httpServer = require('http').createServer();
const io = require('socket.io')(httpServer, {
    cors: {
        origin: 'http://localhost:8080',
        methods: ['GET', 'POST']
    }
});

const messages = [];
const users = [];

function numReadyUsers() {
    return users.filter(user => user.isReady).length;
}

function gameReadyToStart() {
    const numPlayers = users.length;
    if (numPlayers >= 4 && numPlayers <= 6) {
        if (numReadyUsers() === numPlayers) {
            game.initGame();
            io.emit('players', game.players);
        }
    }
}

io.on('connection', (socket) => {
    const newUser = {userID: socket.id, username: socket.username, isReady: false};
    users.push(newUser);
    /*const users = [];
    for (let [id, socket] of io.of('/').sockets) {
        users.push({
            userID: id,
            username: socket.username,
        });
    }*/
    socket.broadcast.emit('user connected', newUser);
    socket.emit('users', users);
    socket.emit('messages', messages);

    socket.on('user ready', user => {
        io.emit('user ready', user);
        users.find(u => u.userID === user.userID).isReady = true;
        if (gameReadyToStart()) {
            initGame();
            io.emit('game start', );
        }
    });
    
    socket.on('new message', message => {
        messages.push(message);
        io.emit('new message', message);
    });

    socket.on('disconnect', () => {
        socket.broadcast.emit('user disconnected', socket.id);
        users.splice(users.findIndex(u => u.userID === socket.id), 1);
    });
});

io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (users.filter(user => user.name === username)) {
        return next(new Error('Username already chosen!'));
    }
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