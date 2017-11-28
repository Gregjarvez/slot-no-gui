import Slot from './slot/index.js'
import configuration from './config.js'
import StateHandler from './state/stateHandler.js'

class Game {
  constructor (configuration) {
    this.slot          = new Slot(configuration)
    this.stateHandler  = StateHandler(this)
    this.state         = this.stateHandler.setInitialState({
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
    this.stateHandler.updateState(predicate);
    this.state /*?*/
  }
}

const game = new Game(configuration)

game.spin();

export default Game
