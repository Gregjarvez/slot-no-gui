import RNG from './modules/rgn.js';
import Observers from './modules/observerList.js';
import View from './modules/view.js';
import cgLogs from './modules/cg.js';

class Slot {
  constructor() {
    this.observerList = new Observers();
    this.generator = new RNG({
      min: 1,
      max: 5,
    });

    this.coinValue = 0.02;

    this.symbols = [
      {
        type: {
          number: 1,
          symbol: 'bell',
        },
        value: 20,
      },
      {
        type: {
          number: 2,
          symbol: 'cherry',
        },
        value: 40,
      },
      {
        type: {
          number: 3,
          symbol: 'orange',
        },
        value: 5,
      },
      {
        type: {
          number: 4,
          symbol: 'prune',
        },
        value: 15,
      },
      {
        type: {
          number: 5,
          symbol: 'seven',
        },
        value: 100,
      },
    ];

    this.winLines = [
      [0, 0, 0],
      [1, 1, 1],
      [2, 2, 2],
      [0, 1, 1],
      [0, 0, 1],
      [2, 1, 0],
    ];

    this.state = {
      grid: new Array(3)
          .fill(5)
          .map(this.generator.randomArray),

      accumulatedWin: 0,
      balance: 1000,
      stake: 10,
      win: false,
      payout: 0,
    };

    this.observerList.subscribe([
      new View(cgLogs.reels, 'grid'),
      new View(cgLogs.winMessage, 'payout'),
      new View(cgLogs.accumulatedWin, 'accumulatedWin'),
      new View(cgLogs.stake, 'stake'),
      new View(cgLogs.cash, 'balance'),
      new View(cgLogs.spinReelMessage),
    ]);

    this.spin = this.spin.bind(this);
    this.start();
  }

  start() {
    this.observerList
        .update(this.state);
  }
  toFixed(val, points) {
    return +(val).toFixed(points || 2);
  }

  spin() {
    this.state.grid.forEach(this.generator.shuffle, this);

    var assertWin = this.assertWin(this.state.grid);
    var winStats = this.winLines
        .map(assertWin)
        .filter(Boolean);

    if (!winStats.length) {
      this.updateState(this.state, function(prevState) {
        return {
          win: false,
          accumulatedWin: this.toFixed(prevState.accumulatedWin),
          balance: this.toFixed(prevState.balance - prevState.stake),
          payout: 0,
        };
      });
      View.clear();
      this.observerList.update(this.state);
    } else {
      this.updateState(this.state, function(prevState) {
        var maxScore = winStats.sort((a, b) => b.symbol - a.symbol)[0];

        var multiplier = this.symbols.find(function(sym) {
          return sym.type.number === maxScore.symbol;
        }).value;

        var payout = maxScore.symbol * multiplier * this.coinValue;

        return {
          accumulatedWin: this.toFixed(prevState.accumulatedWin + payout),
          win: maxScore.winState,
          balance: this.toFixed(prevState.balance + payout),
          payout: payout,
        };
      });
      View.clear();
      this.observerList.update(this.state);
    }
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

  updateState(prevState, predicate) {
    var update = predicate.call(this, prevState);

    for (let key in update) {
      if (this.state.hasOwnProperty(key)) {
        this.state[key] = update[key];
      }
    }
  }

  exit() {
    console.clear();
  }
}

window.slot = new Slot();

