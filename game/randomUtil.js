function pickRandomSingle(elements) {
    if (!elements.length) {
        throw new Error('pickRandomSingle: tried to pick from empty array!');
    }
    const index = Math.random() * (elements.length - 1);
    return elements.splice(index, 1)[0];
}

function pickRandomElements(elements, times) {
    const result = [];
    for (let i = 0; i < times; i++) {
        result.push(pickRandomSingle(elements));
    }
    return result;
}

exports = {pickRandomElements};