import CurrencyHandler from '../src/modules/slot/currency.js'
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
      const expectedProps = ['toFixed', 'computePayout']
      expect(keys.length).toBe(expectedProps.length)
      expect(keys).toEqual(expectedProps)
    })
  })

  test('round a number to specified decimal places', () => {
    return currencyHandlerDb.find('currencyHandler', (currencyHandler) => {
      const testNumber        = 5.43232
      const after2PointsRound = 5.43
      const expected          = currencyHandler.toFixed(testNumber, 2)

      expect(typeof expected).toBe('number')
      expect(after2PointsRound).toEqual(expected)
    })
  })

  test('compute payout based on a constant, multiplier, coinValue', () => {
    return currencyHandlerDb.find('currencyHandler', (currencyHandler) => {
      const coinValue  = 0.5
      const multiplier = 2
      const constant   = 3

      const expected = currencyHandler.computePayout(multiplier, coinValue)
      const actual   = constant * multiplier * coinValue;

      expect(actual).toEqual(expected)

    })
  })
})
