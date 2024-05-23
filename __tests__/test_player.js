import Player from '../player.js';

// ----------------- Player should have these class nomenclature -----------------
// nextPlayerName: For assigning next player name
// name: current player object name
// create: To create a new Player object
// setPosition(x, y): to set current player axis
// x: current player x axis
// y: current player y axis
// nextPosition([x-destination-x, x-destination-y], n-grid-size, m-grid-size): return next position of the player

describe('Player', () => {
  beforeEach(() => {
    Player.nextPlayerName = 'A';
  });

  test('should create a player with the correct name', () => {
    const player = Player.create();
    expect(player.name).toBe('A');
  });

  test('should update the next player name correctly', () => {
    Player.create();
    expect(Player.nextPlayerName).toBe('B');
  });

  test('should reset the next player name after Z', () => {
    Player.nextPlayerName = 'Z';
    Player.create();
    expect(Player.nextPlayerName).toBe('AA');
  });

  test('should reset the next player name after AZ', () => {
    Player.nextPlayerName = 'AZ';
    Player.create();
    expect(Player.nextPlayerName).toBe('BA');
  });

  test('should reset the next player name after ZZ', () => {
    Player.nextPlayerName = 'ZZ';
    Player.create();
    expect(Player.nextPlayerName).toBe('AAA');
  });

  test('should set the player position correctly', () => {
    const player = Player.create();
    player.setPosition(5, 5);
    expect(player.x).toBe(5);
    expect(player.y).toBe(5);
  });

  test('should calculate the next position correctly', () => {
    const player = Player.create();
    player.setPosition(5, 5);
    // Player.nextPosition([x-destination-x, x-destination-y], n-grid-size, m-grid-size)
    const nextPosition = player.nextPosition([7, 7], 10, 10);
    expect(nextPosition).toEqual([6, 6]);
  });

  test('should not move if the player is already at the target position', () => {
    const player = Player.create();
    player.setPosition(7, 7);
    const nextPosition = player.nextPosition([7, 7], 10, 10);
    expect(nextPosition).toEqual([7, 7]);
  });

  test('should not move outside the boundaries', () => {
    const player = Player.create();
    player.setPosition(0, 0);
    const nextPosition = player.nextPosition([7, 7], 1, 1);
    expect(nextPosition).toEqual([0, 0]);
  });
});
