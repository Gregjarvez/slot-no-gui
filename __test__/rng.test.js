import RNG from '../src/modules/slot/rng.js';
import configuration from '../src/modules/states/config.js';
import makeGlobalDatabase from './database.js';

const rngDb = makeGlobalDatabase('rng');

describe('it should ' , () => {
  beforeAll(() => {
    const config = configuration.generatorConfig
    return rngDb.clear()
                .then(db => db.insert({value: RNG(config)}))
  })

  test('return an object when invoked', () => {
    return rngDb.find('rng', (rng) => {
      const instance = rng instanceof Object;
      expect(instance).toBeTruthy();
    })
  })

  test('return 1 for ownPropertiesName', () => {
    return rngDb.find('rng', (rng) => {
      const keys = Object.keys(rng);
      expect(keys.length).toBe(1);
      expect(keys[0]).toBe('generateRandomArray')
    })
  })


  test('generateRandom array when invoked', () => {
    return rngDb.find('rng', (rng) => {
      const random1 = rng.generateRandomArray(5);
      const random2 = rng.generateRandomArray(5);
      expect(random1).not.toEqual(random2);
    })
  })
});