import WinHandler from '../src/modules/slot/winManager.js'
import configuration from '../src/modules/states/config.js'
import makeGlobalDatabase from './database.js'

const winHandlerDb = makeGlobalDatabase('winHandler')
const actualsDb    = makeGlobalDatabase('actual')

function modifier ({win, balance, payout}) {
  return {
    win,
    accumulatedWin: payout,
    balance,
    payout,
  }
}

function mockPayoutValue () {
  return (3 * configuration.symbols[1].value *
    configuration.coinValue)
}

describe('it should ', () => {

  beforeAll(() => {
    const config = {
      coinValue: configuration.generatorConfig,
      symbols: configuration.symbols,
    }
    const grid   = [
      [2, 2, 1, 4, 4],
      [2, 3, 4, 2, 2],
      [2, 5, 1, 4, 1],
    ]

    const actual = {
      grid: grid,
      stateObject: {
        grid: grid,
        win: false,
        accumulatedWin: 0,
        balance: 1000,
        stake: 10,
        payout: 0,
        currency: 'GBP',
      },
      stateObjectAfterWin: {
        grid: grid,
        win: true,
        accumulatedWin: 0,
        balance: 990,
        stake: 10,
        payout: 0,
        currency: 'GBP',
      },
    }

    actualsDb
      .clear()
      .then(db => db.insert({value: actual}))

    winHandlerDb
      .clear()
      .then(db => db.insert({value: WinHandler(config)}))

  })

  test('return an object when invoked', () => {
    return winHandlerDb.find('winHandler', (winHandler) => {
      const instance = winHandler instanceof Object
      expect(instance).toBeTruthy()
    })
  })

  test('return 3 for ownPropertiesName', () => {
    return winHandlerDb.find('winHandler', (winHandler) => {
      const keys          = Object.keys(winHandler)
      const expectedProps = ['assertWin', 'matchFound', 'noMatchFound']
      expect(keys.length).toBe(expectedProps.length)
      expect(keys).toEqual(expectedProps)
    })
  })

  test('assert win when called', () => {
    return winHandlerDb.find('winHandler', (winHandler) => {
      return actualsDb.find('actual', ({grid}) => {
        const winLines = configuration.winLines

        const expectedWinObject = [
          {
            winState: true,
            symbol: 2,
          }]

        const winStats = winLines.reduce(
          winHandler.assertWin(grid, Boolean), [])

        expect(winStats.length).toEqual(1)
        expect(winStats).toEqual(expectedWinObject)
      })
    })
  })

  test('noMatchFound should return a reducer function', () => {
    return winHandlerDb.find('winHandler', (winHandler) => {
      const actual = winHandler.noMatchFound() instanceof Function
      expect(actual).toBe(true)
    })
  })

  test('matchFound should return a reducer function', () => {
    return winHandlerDb.find('winHandler', (winHandler) => {
      return actualsDb.find('actual', ({grid}) => {
        const winLines = configuration.winLines

        const winStats = winLines.reduce(
          winHandler.assertWin(grid, Boolean), [])

        const matchFound = winHandler.matchFound(winStats, grid)
        expect(matchFound instanceof Function).toBe(true)
      })
    })
  })

  test('reduce a stateObject', () => {
    return winHandlerDb.find('winHandler', (winHandler) => {
      return actualsDb.find('actual', ({grid, stateObject}) => {
        const winLines = configuration.winLines

        const winStats = winLines.reduce(
          winHandler.assertWin(grid, Boolean), [])

        const matchFound   = winHandler.matchFound(winStats, grid)
        const noMatchFound = winHandler.noMatchFound(grid)

        const mockPayout = mockPayoutValue()

        const actualStateObjectAfterWin  = Object.assign(
          {}, stateObject, modifier({
            win: true,
            balance: (stateObject.balance + mockPayout),
            payout: mockPayout,
          }),
        )
        const actualStateObjectAfterLose = Object.assign({}, stateObject,
          modifier({
            win: false,
            balance: (stateObject.balance - stateObject.stake),
            payout: 0,
          }),
        )

        const expectedStateAfterLose = noMatchFound(stateObject)
        const expectedStateAfterWin  = matchFound(stateObject)

        expect(actualStateObjectAfterWin).not.toEqual(expectedStateAfterLose)
        expect(actualStateObjectAfterLose).not.toEqual(expectedStateAfterWin)
      })
    })
  })
})