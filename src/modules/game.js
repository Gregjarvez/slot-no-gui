import SlotManager from './slotMAnager.js';
import Observers from './observerList.js';
import view, {possibleViews} from './view.js';

class Game extends SlotManager {
  constructor() {
    super();
    this.observerList = new Observers;
    this.state = {
      grid: this.initialGrid,
      win: false,
      accumulatedWin: 0,
      balance: 1000,
      stake: 10,
      payout: 0,
    };
    this.views = possibleViews;
    this.observerList.subscribe(this.views.map(view));

    this.spin = this.spin.bind(this);
  }

  start() {
    this.notify();
  }

  predicate(winStats) {
    return winStats.length
        ? this.matchFound(winStats)
        : this.noMatchFound;
  }

  spin() {
    this.shuffle.call(this);
    var winStats = this.winLines
        .map(this.assertWin(this.state.grid))
        .filter(Boolean);

    this.updateState(this.predicate(winStats));
    this.clear();
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

  clear() {
    console.clear();
  }
}

export default Game;

