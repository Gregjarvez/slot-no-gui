import Events from '../src/modules/events/events.js'
import makeGlobalDatabase from './database.js'

const eventDb = makeGlobalDatabase('eventInstance')

describe('it should', () => {
  const fnc = jest.fn()

  beforeAll(() => {
    return eventDb.clear().then(db => db.insert({
      value: Events.getInstance(),
    }))
  })

  test('return a single instance when called severally', () => {
    const instance1 = Events.getInstance()
    const instance2 = Events.getInstance()

    const isSameInstance = Object.is(instance1, instance2)
    expect(isSameInstance).toBeTruthy()
  })

  test('add property to buffer when called', () => {
    return eventDb.find('eventInstance', (eventInstance) => {
      eventInstance.on('data', fnc)
      expect(eventInstance.events.has('data')).toBeTruthy()
    })
  })

  test('dispatch an even when called', () => {
    return eventDb.find('eventInstance', (eventInstance) => {
      eventInstance.dispatch('data')

      expect(fnc.mock.calls.length).toBe(1)
    })
  })
})