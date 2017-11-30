import CurrencyHandler from '../src/modules/slot/currency.js';
import makeGlobalDatabase from './database.js'

const currencyHandlerDb = makeGlobalDatabase('currencyHandler')

describe('it should', () => {
  beforeAll(() => {
    return currencyHandlerDb
      .clear().then(db => db.insert({value: CurrencyHandler()}))
  })

  test('return an object when invoked', () => {
    return currencyHandlerDb.find('currencyHandler', (currencyHandler) => {
      const instance = currencyHandler instanceof Object
      expect(instance).toBeTruthy()
    })
  })

  test('return 2 for ownPropertiesName', () => {
    return currencyHandlerDb.find('currencyHandler', (currencyHandler) => {
      const keys          = Object.keys(currencyHandler)
      const expectedProps  = ['toFixed', 'computePayout'];
      expect(keys.length).toBe(expectedProps.length)
      expect(keys).toEqual(expectedProps)
    })
  })
})
