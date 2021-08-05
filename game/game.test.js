const game = require('./game');

const players = ['A', 'B', 'C', 'D'];

test('Distance from player to self is zero', () => {
    expect(game.distance(players, 'A', 'A')).toBe(0);
});

test('Distance from A to C is 2', () => {
    expect(game.distance(players, 'A', 'C')).toBe(2);
});

test('Distance from A to D is only 1', () => {
    expect(game.distance(players, 'A', 'D')).toBe(1);
});

test('Order of players does not matter', () => {
    expect(game.distance(players, 'D', 'A')).toBe(1);
});