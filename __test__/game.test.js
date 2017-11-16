import Game from '../src/modules/game.js';
import makeGlobalDatabase from './database.js';

const globalDatabase = makeGlobalDatabase();

describe('Game Function ', () => {
  beforeEach(() => {
    return globalDatabase.clear().then((database) => {
      return database.insert({game: new Game()});
    });
  });

  test('Instance of game is an Object', () => {
    return globalDatabase.find('game', (game) => {
      expect(typeof game).toBe('object');
    });
  });

  test('start call notify', () => {
    return globalDatabase.find('game', (game) => {
      const notify = jest.spyOn(game, 'notify');
      const start = jest.spyOn(game, 'start');
      game.start();

      expect(start).toHaveBeenCalled();
      expect(notify).toHaveBeenCalledTimes(1);
    });
  });

  test('notify updates all Observers', () => {
    return globalDatabase.find('game', (game) => {
      const update = jest.spyOn(game.observerList, 'update');
      const state = game.state;

      game.notify();

      expect(update).toHaveBeenCalledWith(state);
    });
  });

  test('updateState updates state', () => {
    return globalDatabase.find('game', (game) => {
      const initialstate = {
        ...game.state
      };
      const afterState = {
        grid: [[], [], []],
        win: true,
        accumulatedWin: 20,
        balance: 1000,
        stake: 10,
        payout: 0,
      };
      game.updateState(() => afterState);
      const newState = game.state;

      expect(initialstate).not.toEqual(newState);
    });
  });

  test('predicate returns the right function', () => {
    return globalDatabase.find('game', (game) => {
       const emptyWinStats = [];
       const filledWinStats = new Array(1).fill({});

       expect(game.predicate(filledWinStats)).toHaveBeenCalled();
       expect(game.predicate(emptyWinStats).name).toBe('noMatchFound')
    });
  });
});
