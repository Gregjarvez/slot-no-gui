import Game from '../src/modules/game.js';
import makeGlobalDatabase from './database.js';

const globalDatabase = makeGlobalDatabase('game');

describe('Game Function ', () => {
  beforeEach(() => {
    return globalDatabase.clear().then((database) => {
      return database.insert({value: new Game()});
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

  test('updateState updates states', () => {
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
      expect(game.predicate(emptyWinStats).name).toBe('noMatchFound');

      const filledWinStats = new Array(1).fill({
        winState: true,
        symbol: 3,
      });
      const matchFound = jest.spyOn(game, 'matchFound');
      game.predicate(filledWinStats);
      expect(matchFound).toHaveBeenCalled();
    });
  });

  test('should trigger reset when balance is 0', () => {
    return globalDatabase.find('game', (game) => {
      game.state.balance = 0;
      const reset = jest.spyOn(game, 'reset');
      game.spin();

      expect(reset).toHaveBeenCalled();
    });
  });

  test('should not trigger reset when balance is > 0', () => {
    return globalDatabase.find('game', (game) => {
      game.state.balance = 1000;
      const reset = jest.spyOn(game, 'reset');
      game.spin();

      expect(reset).not.toHaveBeenCalled();
    });

  });

});
