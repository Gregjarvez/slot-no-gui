import Game from './modules/game.js'
import configuration from './modules/states/config.js'
import Events from './modules/events/events.js'

function makeGameInstance () {
  return new Game(configuration)
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
    {
      subject: document.querySelector('.currency'),
      event: {
        type: 'change',
        action: 'currencyChange',
        expects: 'value',
      },
      isDropDown: true,
      default: 'GBP',
    },
  ]

  return Promise.resolve(interfaces)
}

function resetInterface (interfaces) {
  return function () {
    for (let entry of interfaces) {
      entry.isDropDown &&
      (entry.subject.value = entry.default)
    }
  }
}

function addEvents (interfaces) {
  const events = Events.getInstance()

  events.on('currencyReset', resetInterface(interfaces))

  interfaces.forEach(({subject, event} = {}) => {
    subject.addEventListener(event.type, (e) => {
      var value = event.expects && e.target[event.expects]

      events.dispatch(event.action, value)
    })
  })
}

Promise.all([
  makeGameInstance(),
  getInterface(),
]).then(([game, interfaces]) => addEvents(interfaces))


