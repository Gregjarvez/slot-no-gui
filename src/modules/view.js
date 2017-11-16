import cgLogs from './cg.js';

function View(state) {
  var renderer = {
    grid: cgLogs.reels,
    payout: cgLogs.winMessage,
    stake: cgLogs.stake,
    accumulatedWin: cgLogs.accumulatedWin,
    balance: cgLogs.cash,
    logger: cgLogs.spinReelMessage,
  };

  class ViewDescriptor {
    constructor(state) {
      this.assignedState = state;
      this.renderer = renderer[state] || renderer.logger;
    }

    update(state) {
      this.renderer(state[this.assignedState]);
    }

    static clear() {
      return console.clear();
    }
  }

  return new ViewDescriptor(state);
};

export const possibleViews = [
  'grid', 'payout', 'accumulatedWin', 'balance', 'stake', 'logger'
];

export default View;
