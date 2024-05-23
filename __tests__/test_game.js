import Game from '../game.js';
import Player from '../player.js';

// ----------------- Game should have these class nomenclature -----------------
// gameId: To track different game "id", it increases by +1 after a game is created
// id: Game id of an object
// create: Create a new Game object
// addPlayer(player): Add the "player" in the game
// players: List of players inside that game
// checkforCollision(): Check for collision
// checkforWin(): Check for a win

describe('Game', () => {
  beforeEach(() => {
    Game.gameId = 1;
    Player.nextPlayerName = 'A';
  });

  test('should create a game with the correct id', () => {
    const game = Game.create(5, 5);
    expect(game.id).toBe(1);
  });

  test('should update the next game id correctly', () => {
    Game.create(5, 5);
    expect(Game.gameId).toBe(2);
  });

  test('should add a player to the game correctly', () => {
    const game = Game.create(5, 5);
    const player = Player.create();
    game.addPlayer(player);
    expect(game.players).toContain(player);
  });

  test('should not add a player if the game is full', () => {
    const game = Game.create(1, 1);
    const player1 = Player.create();
    const player2 = Player.create();
    // There is only one position available.
    // That will be taken by "X"
    game.addPlayer(player1);
    game.addPlayer(player2);
    expect(game.players).not.toContain(player1);
    expect(game.players).not.toContain(player2);
  });

  test('should detect a collision correctly', () => {
    const game = Game.create(5, 5);
    const player1 = Player.create();
    const player2 = Player.create();
    game.addPlayer(player1);
    game.addPlayer(player2);
    player1.setPosition(2, 2);
    player2.setPosition(2, 2);
    expect(game.checkforCollision()).toBe(true);
  });

  test('should detect a win correctly', () => {
    const game = Game.create(5, 5);
    const player = Player.create();
    game.addPlayer(player);
    player.setPosition(game.xPosition[0], game.xPosition[1]);
    expect(game.checkforWin()).toBe(true);
  });
});
