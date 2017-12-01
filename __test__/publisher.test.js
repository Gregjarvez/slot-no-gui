import Publisher from '../src/modules/publisher/observerList.js'
import makeGlobalDatabase from './database.js'

const publisherDb = makeGlobalDatabase('publisher')

function mockObjects () {
  return {
    id: Math.random(),
    update: jest.fn(),
  }
}

function makeMockObservers (number) {
  return new Array(number)
    .fill(null)
    .map(mockObjects)
}

describe('it should', () => {

  beforeAll(() => {
    return publisherDb.clear().then(db => db.insert({
      value: new Publisher(),
    }))
  })

  test('subscribe observer objects', () => {
    return publisherDb.find('publisher', (publisher) => {
      const observers = makeMockObservers(5);
      publisher.subscribe(observers);

      expect(publisher.observers).toEqual(observers);
    })
  })

  test('updates all observes', () => {
    return publisherDb.find('publisher', (publisher) => {
      publisher.update()
      const callTimesForEach = new Array(publisher.observers.length).fill(1)
      const called = publisher.observers.map(obs => {
        return obs.update.mock.calls.length
      })

      expect(called).toEqual(callTimesForEach);
    })
  })

})