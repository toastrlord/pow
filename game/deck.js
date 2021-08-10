const { default: Card } = require('./card');
const fs = require('fs');
const randomUtil = require('./randomUtil');
const deck = [];
const discard = [];

/**
 * Should be called on starting a new game. Clears the deck, loads the card data from path, and 
 * shuffles it.
 * @param {*} path 
 */
function loadCards(path) {
    deck.splice(0, deck.length);
    const cardData = JSON.parse(fs.readFileSync(path));
    deck.push(cardData.map(thisData => {
        const newCards = [];
        for (let i = 0; i < thisData.quantity; i++) {
            newCards.push(new Card(thisData.name, thisData.description, thisData.imgSrc));
        }
        return newCards;
    }));
    shuffle();
    console.log(deck);
}

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

exports = {drawDeck, peekDeck, shuffle, discardCard, loadCards }