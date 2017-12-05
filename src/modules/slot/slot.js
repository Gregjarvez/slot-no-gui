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
    this.currency   = configuration.currency

    this.rng             = RNG(configuration.generatorConfig)
    this.winHandler      = Winhandler({
      coinValue: this.coinValue,
      symbols: this.symbols,
    })
    this.currencyHandler = CurrencyHandler().onCurrencyChange

    this.onSpin = this.onSpin.bind(this)
  }

  onSpin () {
    var grid     = this.generateGridNumbers()
    var winStats = this.winLines
                       .reduce(
                         this.winHandler.assertWin(grid, Boolean), [])
    var stats    = {
      winStats: winStats,
      grid: grid,
      currency: this.currency,
    }
    return this.reducer(stats)
  }

  generateGridNumbers () {
    var grid = new Array(this.reelNumber).fill(this.reelLength)
    return grid.map(this.rng.generateRandomArray)
  }

  reducer ({winStats, grid}) {
    return winStats.length
      ? this.winHandler.matchFound(winStats, grid)
      : this.winHandler.noMatchFound(grid)
  }

  computeInitialGrid () {
    return this.generateGridNumbers()
  }

}

export default Slot
