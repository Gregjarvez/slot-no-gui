import RNG from './rng.js'
import Winhandler from './winManager.js'
import CurrencyHandler from './currency.js'

class Slot {
  constructor (configuration) {
    this.winLines   = configuration.winLines
    this.stake      = configuration.stake
    this.reelNumber = configuration.reelNumber
    this.reelLength = configuration.reelLength
    this.symbols    = configuration.symbols
    this.coinValue  = configuration.coinValue
    this.symbols    = configuration.symbols

    this.currencyHandler = CurrencyHandler()
    this.rng             = RNG(configuration.generatorConfig)
    this.winHandler      = Winhandler({
      coinValue: this.coinValue,
      symbols: this.symbols,
    })

    this.computeInitialGrid();
    this.onSpin = this.onSpin.bind(this)
  }

  onSpin () {
    var grid     = this.generateGridNumbers()
    var winStats = this.winLines
                       .reduce(
                         this.winHandler.assertWin(grid, Boolean), [])
    return this.predicate(winStats, grid);
  }

  generateGridNumbers () {
    var grid = new Array(this.reelNumber).fill(this.reelLength)
    return grid.map(this.rng.randomArray)
  }

  predicate (winStats, grid) {
    return winStats.length
      ? this.winHandler.matchFound(winStats, grid)
      : this.winHandler.noMatchFound(grid)
  }

  computeInitialGrid () {
    return this.generateGridNumbers()
  }

}

export default Slot
