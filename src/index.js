import RNG from './modules/rgn.js';
import Observer from './modules/observerList.js';
import View from './modules/view.js';

class Slot {
  constructor() {
    this.observerList = new Observer();
    this.generator = new RNG({
      min: 1,
      max: 5,
    });
    this.observerList.subscribe([
      new View(),
    ]);

    this.symbols = {
      bell: {
        type: 1,
        count: 3,
        value: 20,
      },
      cherry: {
        type: 2,
        count: 3,
        value: 40,
      },
      orange: {
        type: 3,
        count: 3,
        value: 5,
      },
      prune: {
        type: 4,
        count: 3,
        value: 15,
      },
      seven: {
        type: 5,
        count: 3,
        value: 100,
      },
    };
    this.winLines = [
      [0, 0, 0],
      [1, 1, 1],
      [2, 2, 2],
      [0, 1, 1],
      [0, 0, 1],
      [2, 1, 0],
    ],

        this.state = {
          grid: new Array(3)
              .fill(5)
              .map(this.generator.randomArray),
          currency: {
            accumulatedWin: null,
            startValue: 1000,
            balance: 1000,
            stake: 10,
          },
          win: false,
          winScore: null,
        };
  }

  start() {
    this.notify(this.state);
  }

  spin() {
    var grid = this.state.grid.map(this.generator.shuffle, this);
    var assertWin = this.assertWin(grid);
    var winStats = this.winLines.map(assertWin, this);

    this.updateState({
      grid: grid,
    });
    this.notify(this.state);
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
      symbol: matches ? rv.reel1 : null
    };
  }

  notify(state) {
    this.observerList.update(state);
  }

  updateState(update) {
    Object.assign(this.state, update);
  }

  checkWin() {

  }

  exit() {
    console.clear();
  }
}

var slot = new Slot();
slot.grid;
/* ? */
