const messages = [];
const players = [];
const MAX_MESSAGES = 25;

exports.addMessage = function(author, content) {
    if (messages.length >= MAX_MESSAGES) {
        messages.pop();
    }
    messages.push({author, content});
}

exports.addPlayer = function(name) {
    players.push(name);
}

exports.getMessages = function() {
    return Object.assign(messages);
}

exports.getPlayers = function() {
    return Object.assign(players);
}