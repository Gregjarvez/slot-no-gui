import Slot from '../src/modules/slot/slot.js'
import makeGlobalDatabase from './database.js'
import configuration from '../src/modules/states/config.js'

const slotdb = makeGlobalDatabase('slot')
const gridDb = makeGlobalDatabase('grid')

describe('it should', () => {
  beforeEach(() => {
    const config = configuration
    const grid   = [
      [2, 2, 1, 4, 4],
      [2, 3, 4, 2, 2],
      [2, 5, 1, 4, 1],
    ]

    gridDb
      .clear().then(db => db.insert({value: grid}))

    slotdb
      .clear().then(db => db.insert({value: new Slot(config)}))
  })

  test('return a reducer function', () => {
    return slotdb.find('slot', (slot) => {
      const reducer = slot.onSpin()
      const expected  = reducer instanceof Function
      expect(expected).toBe(true)
    })
  })

  test('return noMatchFound when winstats is null', () => {
    return slotdb.find('slot', (slot) => {
      return gridDb.find('grid', (grid) => {
        const winStats     = {
          winStats: [],
          grid: grid,
        }
        const noMatchFound = jest.spyOn(slot.winHandler, 'noMatchFound')

        slot.reducer(winStats)

        expect(noMatchFound).toHaveBeenCalled()
      })
    })
  })

  test('call matchFound on win', () => {
    return slotdb.find('slot', (slot) => {
      return gridDb.find('grid', (grid) => {
        const winStats   = {
          winStats: [{type: 2, symbol: 3}, {type: 2, symbol: 1}],
          grid: grid,
        }
        const matchFound = jest.spyOn(slot.winHandler, 'matchFound')

        slot.reducer(winStats)

        expect(matchFound).toHaveBeenCalled()
      })
    })
  })

  test('return a 3 * 3 matrix defined in configuration', () => {
    return slotdb.find('slot', (slot) => {
      const grid             = slot.generateGridNumbers()
      const actualReelLength = configuration.reelLength
      const actualReelNumber = configuration.reelNumber

      const gridReelLength = grid.map(reel => reel.length)

      expect(grid.length).toEqual(actualReelNumber)
      expect(
        gridReelLength
          .filter(reel => reel !== actualReelLength).length,
      ).toEqual(0)
    })
  })

  test('should delegate call to generateGridNumbers', () => {
    return slotdb.find('slot', (slot) => {
      const generateGrid = jest.spyOn(slot, 'computeInitialGrid')
      slot.computeInitialGrid();

      expect(generateGrid).toHaveBeenCalled();
    })
  })
})
