import RNG from './modules/rgn.js';
import SlotManager from './modules/slotMAnager.js';
import Observers from './modules/observerList.js';
import View from './modules/view.js';
import cgLogs from './modules/cg.js';

class Game extends SlotManager {
  constructor() {
    super();
    this.observerList = new Observers;
    this.rng = new RNG({
      min: 1,
      max: 5,
    });
    this.coinValue = 0.5;
    this.symbols = [
      {type: 1, value: 20},
      {type: 2, value: 40},
      {type: 3, value: 5},
      {type: 4, value: 15},
      {type: 5, value: 100},
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
          .map(this.rng.randomArray),

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
    this.shuffle.call(this);
    var winStats = this.winLines
        .map(this.manager.assertWin(this.state.grid))
        .filter(Boolean);

    this.updateState(this.predicate(winStats));
    View.clear();
    this.notify();
  }

  updateState(predicate) {
    var update = predicate.call(this, this.state);

    for (let key in update) {
      if (update.hasOwnProperty(key)) {
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

window.game = new Game();

