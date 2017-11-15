import RNG from './modules/rgn.js';
import SlotManager from './modules/slotMAnager.js';
import Observers from './modules/observerList.js';
import View from './modules/view.js';
import cgLogs from './modules/cg.js';

class Slot extends SlotManager {
  constructor() {
    super();
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
    this.notify();
  }

  spin() {
    this.shuffleGrid();
    var winStats = this.winLines
        .map(this.assertWin(this.state.grid))
        .filter(Boolean);

    if (!winStats.length) {
      this.updateState(this.noMatchFound);
      View.clear();
      this.notify();
    } else {
      this.updateState(this.matchFound(winStats));
      View.clear();
      this.notify();
    }
  }

  updateState(predicate) {
    var update = predicate.call(this, this.state);

    for (let key in update) {
      if (this.state.hasOwnProperty(key)) {
        this.state[key] = update[key];
      }
    }
  }

  notify() {
    this.observerList.update(this.state);
  }

  static exit() {
    console.clear();
  }
}

window.slot = new Slot();

