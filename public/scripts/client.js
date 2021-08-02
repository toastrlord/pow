const socket = io('localhost:3000', {autoConnect: false});
const form = document.querySelector('form');
const input = document.querySelector('input');
const userContainer = document.createElement('div');
document.querySelector('body').append(userContainer);

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        socket.connect();
        socket.emit('new username', input.value);
    }
});

socket.on('new username', function(users) {
    while(userContainer.firstChild) {
        userContainer.removeChild(userContainer.firstChild);
    }
    users.forEach(user => {
        const item = document.createElement('p');
        item.textContent = user;
        userContainer.appendChild(item);
    });
});

socket.on('display change', function(htmlData) {

});

socket.onAny((event, ...args) => {
    console.log(event, args);
});