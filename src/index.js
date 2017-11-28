import Game from './modules/game.js'
import configuration from './modules/states/config.js'
import Events from './modules/events/events.js'

function init () {
  const game   = new Game(configuration)
  const events = Events.getInstance()

  var spin  = document.querySelector('.spin')
  var reset = document.querySelector('.reset')

  spin.addEventListener('click', () => {
    events.dispatch('spin')
  })

  reset.addEventListener('click', () => {
    events.dispatch('reset')
  })

}

init()
