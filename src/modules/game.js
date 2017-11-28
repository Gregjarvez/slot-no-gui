import Slot from './slot/index.js'
import configuration from './states/config.js'
import StateHandler from './states/stateHandler.js'
import Publisher from './observer/observerList.js'

class Game {
  constructor (configuration) {
    this.slot         = new Slot(configuration)
    let context       = this
    this.stateHandler = StateHandler(context)
    this.publisher    = new Publisher()
    this.state        = this.stateHandler.setInitialState({
      grid: this.slot.computeInitialGrid(),
      win: false,
      accumulatedWin: 0,
      balance: 1000,
      stake: this.slot.stake,
      payout: 0,
      currency: 'GBP',
    })
  }

  spin () {
    var predicate = this.slot.onSpin()
    this.stateHandler.updateState(predicate)
    this.notify()
  }

  notify () {
    this.publisher.update(this.state)
  }
}

const game = new Game(configuration)

game.spin()

export default Game
