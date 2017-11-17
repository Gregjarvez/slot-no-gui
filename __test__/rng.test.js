import RNG from '../src/modules/rgn.js';
import config from '../src/modules/assets.js';
import makeGlobalDatabase from './database.js';

const db = makeGlobalDatabase('rng');

describe('Random number generator ', () => {
  beforeEach(() => {
    return db.clear().then((database) => {
      return database.insert({value: new RNG(config.rngConfig)});
    });
  });

  test('randomArray should return a random Array', () => {
    return db.find('rng', (rng) => {
      const randomArray = rng.randomArray(5);
      expect(randomArray.length).toBe(5);
    });
  });

  test('shuffle returns a randomised array', () => {
    return db.find('rng', (rng) => {
      const arr = [1, 2, 3, 4, 5];
      const randomised = rng.shuffle([...arr]);
      const isShuffled = arr.some((el, index) => randomised[index] !== el);
      expect(isShuffled).toBe(true);
    });
  });

  test('random array is within range', () => {
    return db.find('rng', (rng) => {
      const randomArray = rng.randomArray(5);
      expect(Math.max(...randomArray)).toEqual(rng.max);
      expect(Math.min(...randomArray)).toEqual(rng.min);
    });
  });
});
