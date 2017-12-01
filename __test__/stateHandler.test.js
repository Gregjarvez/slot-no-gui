import StateHanlder from '../src/modules/states/stateHandler'
import makeGlobalDatabase from './database'

const handlerdb = makeGlobalDatabase('stateHandler')
const assets    = makeGlobalDatabase('assets')

describe('it should', () => {
  beforeAll(() => {
    const grid = [
      [2, 2, 1, 4, 4],
      [2, 3, 4, 2, 2],
      [2, 5, 1, 4, 1],
    ]

    const stateObject = {
      grid: grid,
      win: false,
      accumulatedWin: 0,
      balance: 1000,
      stake: 10,
      payout: 0,
    }

    class MockContext {
      constructor () {
        this.state = stateObject
      }
    }

    const context = new MockContext

    const asset = {
      context,
      stateObject,
    }

    assets.clear()
          .then(
            db => db.insert({value: asset}))
    handlerdb.clear()
             .then(
               db => db.insert({value: StateHanlder(context)}))
  })

  test('should store state on call', () => {
    return handlerdb.find('stateHandler', (stateHandler) => {
      return assets.find('assets', ({stateObject}) => {
        stateHandler.setInitialState(stateObject)

        expect(stateHandler.getInititalState()).toEqual(stateObject)
      })
    })
  })

  test('should update context state', () => {
    return handlerdb.find('stateHandler', (stateHandler) => {
      return assets.find('assets', ({context}) => {
        stateHandler.updateState(() => ({
          win: true,
          grid: null,
          balance: null,
        }))
      })

      expect(context.state).not.toEqual(stateHandler.getInititalState())
    })
  })
})