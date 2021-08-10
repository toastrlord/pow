const socket = io('localhost:3000', {autoConnect: false});

socket.onAny((event, ...args) => {
    console.log(event, args);
});