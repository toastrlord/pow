const randomUtil = require('./randomUtil');
const deck = loadCards();
const discard = [];

/**
 * Draw the given number of cards from the deck, re-shuffling from the discard pile
 * if the deck runs out of cards
 * @param {Integer} numCards 
 * @returns 
 */
function drawDeck(numCards) {
    const result = [];
    for (let i = 0; i < numCards; i++) {
        result.push(drawCard());
    }
    return result;
}

/**
 * Look at the top cards of the deck without modifying the deck
 * @param {Integer} numCards 
 * @returns 
 */
function peekDeck(numCards) {
    if (deck.length < numCards) {
        shuffle();
    }
    return deck.slice(0, numCards);
}

function drawCard() {
    if (!deck.length) {
        shuffle();
    }
    return deck.pop();
}

/**
 * Take the discard pile and reshuffle it into the deck
 */
function shuffle() {
    const shuffled = randomUtil.pickRandomMultiple(discard, discard.length);
    deck.push(shuffled);
}

function discardCard(card) {
    discard.push(card);
}

exports = {drawDeck, peekDeck, shuffle, discardCard }