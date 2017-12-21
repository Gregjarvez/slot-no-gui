import Slot from './slot/slot.js'
import StateHandler from './states/stateHandler.js'
import Publisher from './publisher/observerList.js'
import View from './gui/view.js'
import Events from './events/events.js'

class Game {
  constructor (configuration) {
    this.slot            = new Slot(configuration)
    let context          = this
    this.stateHandler    = StateHandler(context)
    this.publisher       = new Publisher()
    this.events          = Events.getInstance()
    this.state           = this.stateHandler.setInitialState({
      grid: {
        gridLines: this.slot.computeInitialGrid(),
        winLines: []
      },
      win: false,
      accumulatedWin: 0,
      balance: 1000,
      stake: this.slot.stake,
      payout: 0,
      currency: 'GBP',
    })
    this.currencyHandler = this.slot.currencyHandler(this.state)
    this.publisher.subscribe(configuration.views.map(View))
    this.start()
    this.configureEvents()
  }

  start () {
    this.notify()
  }

  spin () {
    var reducer = this.slot.onSpin()
    this.stateHandler.updateState(reducer)
    this.notify()
  }

  oncurrencyChange (currency) {
    var state = this.currencyHandler(this.state, currency);
    this.stateHandler.updateState(() => state)
    this.notify();
  }

  reset () {
    this.stateHandler.updateState(() => {
      return this.stateHandler.getInititalState()
    })
    this.notify()
    this.events.dispatch('currencyReset')
  }

  notify () {
    this.publisher.update(this.state)
  }

  configureEvents () {
    this.events
        .on('spin', this.spin.bind(this))
        .on('reset', this.reset.bind(this))
        .on('currencyChange', this.oncurrencyChange.bind(this))
  }
}

export default Game
