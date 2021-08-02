const characters = loadCharacters();
const currentPlayerIndex = 0;

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
        player.addDeathListener(() => onPlayerDeath(player));
    });
    
    // reorder players so that the sheriff goes first, and other players go after
    const sheriffIndex = players.findIndex((player) => {
        return player.role === 'S';
    });
    const playersBeforeSheriff = players.splice(sheriffIndex);
    players = players.push(playersBeforeSheriff);
}

function onPlayerDeath(player) {
    if (player.role === 'S') {
        // either outlaws win, or renegades win
        const survivingPlayers = players.filter(player => player.isAlive());
        if (survivingPlayers.length === 1 && survivingPlayers[0].role === 'R') {
            // renegade wins!
        }
        else {
            // outlaws win!
        }
    }
    else {
        if (!players.filter(player => player.isAlive() && player.role === 'O' || player.role === 'R').length) {
            // sheriff wins!
        }
    }
}

function playCard(player, card, target) {
    // resolve the cards effects
}

function nextTurn() {
    do {
        currentPlayerIndex++;
    } while (!players[currentPlayerIndex].isAlive());
}

function startTurn() {
    // need to resolve any effects on the current player before allowing them to play cards
}