import Game from './modules/game.js'
import configuration from './modules/states/config.js'
import Events from './modules/events/events.js'

function makeGameInstance () {
  new Game(configuration)
  return Promise.resolve()
}

function getInterface () {
  const interfaces = [
    {
      subject: document.querySelector('.spin'),
      event: {
        type: 'click',
        action: 'spin',
      },
    },
    {
      subject: document.querySelector('.reset'),
      event: {
        type: 'click',
        action: 'reset',
      },
    },
  ]

  return Promise.resolve(interfaces)
}

function addEvents (interfaces) {
  const events = Events.getInstance()
  interfaces.forEach(({subject, event} = {}) => {
    subject.addEventListener(event.type, () => {
      events.dispatch(event.action)
    })
  })
}

Promise.all([
  makeGameInstance(),
  getInterface()
]).then(([game, interfaces]) => addEvents(interfaces))


