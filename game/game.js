const deck = require('./deck');
//const characters = loadCharacters();
const currentPlayerIndex = 0;

function initGame(players) {
    deck.loadCards('./data/card_data.json');
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
    load
}

function onPlayerDeath(player, killer) {
    if (player.role === 'O') {
        // cause the killer to draw 3 cards as a reward
    }
    else if (player.role === 'D') {
        // if the killer was the sheriff, strip them of all their belongings as punishment
    }
    else if (player.role === 'S') {
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

function distance(players, player1, player2) {
    const p1Index = players.indexOf(player1);
    const p2Index = players.indexOf(player2);
    const minIndex = Math.min(p1Index, p2Index);
    const maxIndex = Math.max(p1Index, p2Index);
    const dist1 = maxIndex - minIndex; // checking to the right
    const dist2 = minIndex + (players.length - maxIndex); //checking to the left

    return Math.min(dist1, dist2);
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

module.exports.distance = distance;