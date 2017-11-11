import RNG from './modules/rgn.js';
import Observer from './modules/observerList.js';

class Slot {
  constructor() {
    this.observerList = new Observer();
    this.accumulatedWin = 0;
    this.stake = 10;
    this.balance = {
      start: 1000,
      left: 0,
    };
    this.winLines = [
      [0, 1, 1],
      [0, 0, 1],
      [2, 1, 0],
    ];
    this.generator = new RNG({
      min: 1,
      max: 5,
    });
    this.grid = new Array(3)
        .fill(5)
        .map(this.generator.randomArray);
    // ObserverList
  }

  notify(change) {
    this.observerList.update(change);
  }
}


var slot = new Slot();
slot.grid; /* ? */
