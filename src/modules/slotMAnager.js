import config from './assets.js';
import RNG from './rgn.js';

class SlotManager {
  constructor() {
    Object.assign(this, config);

    this.rng = new RNG(this.rngConfig);
    this.initialGrid = this.computeInitialGrid();
  }

  toFixed(val, points) {
    return +((val).toFixed(points || 2));
  }

  shuffle() {
    this.state.grid.forEach(this.rng.shuffle, this);
  }

  deepCompare(lines, grid) {
    var is = Object.is;
    var [l1, l2, l3] = lines;
    var rv = {
      reel1: grid[0][l1],
      reel2: grid[1][l2],
      reel3: grid[2][l3],
    };

    var matches = is(rv.reel1, rv.reel2) &&
        is(rv.reel2, rv.reel3) &&
        is(rv.reel3, rv.reel1);

    return {
      winState: matches,
      symbol: matches ? rv.reel1 : null,
    };
  }

  assertWin(grid) {
    var context = this;
    return function(lines) {
      var matches = this.deepCompare(lines, grid);

      if (!matches.winState) {
        return false;
      }
      return matches;
    }.bind(context);
  }

  noMatchFound(prevState) {
    return {
      win: false,
      accumulatedWin: this.toFixed(prevState.accumulatedWin),
      balance: this.toFixed(prevState.balance - prevState.stake),
      payout: 0,
    };
  };

  matchFound(winStats) {
    var maxScore = winStats.sort(function(a, b) {
      return b.symbol - a.symbol;
    })[0];

    var multiplier = this.symbols.find(function(sym) {
      return sym.type === maxScore.symbol;
    }).value;

    var payout = 3 * multiplier * this.coinValue;
    return function(prevState) {
      return {
        accumulatedWin: this.toFixed(prevState.accumulatedWin + payout),
        win: maxScore.winState,
        balance: this.toFixed(prevState.balance + payout),
        payout: payout,
      };
    };
  }

  computeInitialGrid() {
    return new Array(this.gridLength)
        .fill(this.reelLength)
        .map(this.rng.randomArray);
  }
}

export default SlotManager;
