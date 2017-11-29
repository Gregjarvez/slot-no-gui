import CurrencyHandler from './currency.js'


var WinHandler = function ({coinValue, symbols}) {

  var is = Object.is
  var coinValue = coinValue
  var symbols = symbols
  var curHandler = CurrencyHandler()

  function assertWin (grid, filter) {
    return function (acc, line) {
      var matches = deepCompare(line, grid)

      if (filter(matches.winState)) {
        acc.push(matches)
        return acc
      }
      return acc
    }
  }

  function toFixed (value, decimalPlaces = 2) {
    return +(
      (
        value
      ).toFixed(decimalPlaces)
    )
  }

  function setCoinValue (value) {
    coinValue = value
    return
  }

  function setSymbols (sym) {
    symbols = sym
    return false
  }

  function deepCompare (line, grid) {
    var [l1, l2, l3] = line
    var rv = {
      reel1: grid[0][l1],
      reel2: grid[1][l2],
      reel3: grid[2][l3],
    }

    var matches = is(rv.reel1, rv.reel2) &&
                  is(rv.reel2, rv.reel3) &&
                  is(rv.reel3, rv.reel1)

    return {
      winState: matches,
      symbol  : matches ? rv.reel1 : null,
    }
  }

  function noMatchFound (grid) {
    return function (prevState) {
      return {
        grid: grid,
        win           : false,
        accumulatedWin: curHandler.toFixed(prevState.accumulatedWin),
        balance       : curHandler.toFixed(prevState.balance - prevState.stake),
        payout        : 0,
      }
    }
  }

  function matchFound (winStats, grid) {

    var maxScore = winStats.sort(function (a, b) {
      return b.symbol - a.symbol
    })[0]

    var multiplier = symbols.find(function (sym) {
      return sym.type === maxScore.symbol
    }).value

    var payout = curHandler.computePayout(multiplier, coinValue);

    return function (prevState) {
      return {
        grid: grid,
        accumulatedWin: curHandler.toFixed(prevState.accumulatedWin + payout),
        win           : maxScore.winState,
        balance       : curHandler.toFixed(prevState.balance + payout),
        payout        : payout,
      }
    }
  }

  return {
    assertWin   : assertWin,
    matchFound  : matchFound,
    noMatchFound: noMatchFound,
    setCoinValue: setCoinValue,
    setSymbols  : setSymbols,

  }
}

export default WinHandler
