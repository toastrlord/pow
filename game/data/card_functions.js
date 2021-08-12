const deck = require('../deck');

/* card may either be onEquip, which only takes the user as an arugment
   or an onPlay, which takes the source, and optionally a target
*/

exports.pow = function(thisCard, user, target) {
    target.harm(1);
}

exports.equip = function(thisCard, user) {
    user.equip(thisCard);
}

exports.medicine = function(thisCard, user, target) {
    target.heal(1);
}

exports.supplyCache = function(thisCard, user, target) {
    user.hand.push(deck.drawDeck(3));
}

exports["time chamber"] = function(thisCard, user, target) {
    // TODO! Skip targets turn!
}