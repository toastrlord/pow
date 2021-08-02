const characters = loadCharacters();
const deck = loadCards();
const discard = [];

function drawCards(numCards) {
    const result = [];
    for (let i = 0; i < numCards; i++) {
        result.push(drawCard());
    }
    return result;
}

function drawCard() {
    if (!deck.length) {
        shuffle();
    }
    return deck.pop();
}

function shuffle() {
    const shuffled = pickRandomMultiple(discard, discard.length);
    deck.push(shuffled);
}

function discardCard(card) {
    discard.push(card);
}

function pickRandomSingle(elements) {
    if (!elements.length) {
        throw new Error('pickRandomSingle: tried to pick from empty array!');
    }
    const index = Math.random() * (elements.length - 1);
    return elements.splice(index, 1)[0];
}

function pickRandomMultiple(elements, times) {
    const result = [];
    for (let i = 0; i < times; i++) {
        result.push(pickRandomSingle(elements));
    }
    return result;
}

function initGame(players) {
    let roles;
    switch (players.length) {
        case 4:
            roles = ['S', 'O', 'O', 'R'];
            break;
        case 5:
            roles = ['S', 'O', 'O', 'R', 'D'];
            break;
        case 6:
            roles = ['S', 'O', 'O', 'O', 'R', 'D'];
            break;
        default:
            throw new Error('Invalid number of players! Must be between 4 and 6.');
    }
    // assign roles at random, give them two characters to pick from, and give them a starting hand
    // equal to their max health
    players.foreach(player => {
        player.role = pickRandomSingle(roles);
        player.charactersToPick = pickRandomMultiple(characters, 2);
        player.hand = drawCards(player.maxHealth);
    });
    
    // reorder players so that the sheriff goes first, and other players go after
    const sheriffIndex = players.findIndex((player) => {
        return player.role === 'S';
    });
    const playersBeforeSheriff = players.splice(sheriffIndex);
    players = players.push(playersBeforeSheriff);
}