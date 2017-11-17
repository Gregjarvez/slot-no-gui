import slotManager from '../src/modules/slotMAnager.js';
import makeGlobalDatabase from './database.js';
import Game from '../src/modules/game.js';

const slotdb = makeGlobalDatabase('slotmanager');
const gamedb = makeGlobalDatabase('game');

describe('slot manager', () => {
  beforeAll(() => {
    return slotdb.clear().then((db) => {
      db.insert({value: new slotManager});
    });
  });

  beforeEach(() => {
    return gamedb.clear().then((database) => {
      return database.insert({value: new Game()});
    });
  });

  const assets = {
    grid: [
      [1, 1, 2, 3, 5],
      [1, 3, 4, 2, 4],
      [1, 2, 3, 3, 2],
    ],
    lines: [
      [0, 0, 0],
    ],
  };

  test('tofixed rounds a number to specified points', () => {
    return slotdb.find('slotmanager', (manager) => {
      const points = 2;
      const double = 4.3232;
      const rounded = +double.toFixed(2);

      expect(manager.toFixed(double, points)).toEqual(rounded);
    });
  });

  test('deepCompare returns a boolean on match found', () => {
    return slotdb.find('slotmanager', (manager) => {
      const grid = assets.grid;
      const line = assets.lines[0];

      const deepCompare = manager.deepCompare(line, grid);

      expect(deepCompare.winState).toBe(true);
      expect(deepCompare.symbol).toBe(1);
    });
  });

  test('deepCompare returns a boolean on match found', () => {
    return slotdb.find('slotmanager', (manager) => {
      const grid = assets.grid;
      const lines = assets.lines;

      const fnCompare = jest.spyOn(manager, 'deepCompare');

      const maybeWin = lines.map(manager.assertWin(grid));
      expect(fnCompare).toBeCalledWith(lines[0], grid);
      expect(maybeWin).toBeTruthy();
    });
  });

});