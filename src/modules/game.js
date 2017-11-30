import Slot from './slot/slot.js'
import StateHandler from './states/stateHandler.js'
import Publisher from './publisher/observerList.js'
import View from './gui/view.js'
import Events from './events/events.js'

class Game {
  constructor (configuration) {
    this.slot         = new Slot(configuration)
    let context       = this
    this.stateHandler = StateHandler(context)
    this.publisher    = new Publisher()
    this.events       = Events.getInstance()
    this.state        = this.stateHandler.setInitialState({
      grid: this.slot.computeInitialGrid(),
      win: false,
      accumulatedWin: 0,
      balance: 1000,
      stake: this.slot.stake,
      payout: 0,
      currency: 'GBP',
    })
    this.publisher.subscribe(configuration.views.map(View))
    this.start()
    this.configureEvents()
  }

  start () {
    this.notify()
  }

  spin () {
    var predicate = this.slot.onSpin()
    this.stateHandler.updateState(predicate)
    this.notify()
  }

  reset () {
    this.stateHandler.updateState(() => {
      return this.stateHandler.getInititalState()
    })
    this.notify()
  }

  notify () {
    this.publisher.update(this.state)
  }

  configureEvents () {
    this.events
        .on('spin', this.spin.bind(this))
        .on('reset', this.reset.bind(this))
  }
}

export default Game
