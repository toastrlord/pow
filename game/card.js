class Card {
    constructor(name, description, imgSrc, onPlay) {
        this.name = name;
        this.description = description;
        this.imgSrc = imgSrc;
        this.onPlay = onPlay;
    }
}

exports.Card = Card;