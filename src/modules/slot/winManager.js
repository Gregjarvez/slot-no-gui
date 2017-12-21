import CurrencyHandler from './currency.js'

var WinHandler = function ({coinValue, symbols}) {

  var is         = Object.is,
      coinValue  = coinValue,
      symbols    = symbols,
      curHandler = CurrencyHandler()

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

  function deepCompare (line, grid) {
    var [l1, l2, l3] = line
    var rv           = {
      reel1: grid[0][l1],
      reel2: grid[1][l2],
      reel3: grid[2][l3],
    }

    var matches = is(rv.reel1, rv.reel2) &&
      is(rv.reel2, rv.reel3) &&
      is(rv.reel3, rv.reel1)

    return {
      winState: matches,
      line: line,
      symbol: matches ? rv.reel1 : null,
    }
  }

  function noMatchFound (grid) {
    return function (prevState) {
      return {
        grid: {
          gridLines: grid,
          winLines: []
        },
        win: false,
        accumulatedWin: curHandler.toFixed(prevState.accumulatedWin),
        balance: curHandler.toFixed(prevState.balance - prevState.stake),
        payout: 0,
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

    var payout = curHandler.computePayout(multiplier, coinValue)

    return function (prevState) {
      return {
        grid: {
          gridLines: grid,
          winLines: winStats[0].line
        },
        accumulatedWin: curHandler.toFixed(prevState.accumulatedWin + payout),
        balance: curHandler.toFixed(prevState.balance + payout),
        payout: payout,
      }
    }
  }

  return {
    assertWin: assertWin,
    matchFound: matchFound,
    noMatchFound: noMatchFound,
  }
}

export default WinHandler
