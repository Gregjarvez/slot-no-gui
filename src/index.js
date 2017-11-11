import RNG from './modules/rgn.js';

class Slot {
  constructor() {
    this.accumulatedWin = 0;
    this.stake = 10;
    this.balance = {
      start: 1000,
      left: 0,
    };
    this.winLines = [
      [0, 1, 1],
      [1, 0, 1],
      [0, 0, 1],
      [1, 0, 0],
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
}


var slot = new Slot();
slot.grid; /* ? */
