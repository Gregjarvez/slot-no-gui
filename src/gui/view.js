import views from './renderers.js';

function View(state) {
  var renderer = {
    grid: views.grid,
    payout: views.payout,
    stake: views.stake,
    accumulatedWin: views.totalWin,
    balance: views.balance,
  };

  class ViewDescriptor {
    constructor(state) {
      this.assignedState = state;
      this.renderer = renderer[state]
    }

    update(state) {
      this.renderer(state[this.assignedState]);
    }
  }

  return new ViewDescriptor(state);
};

export const possibleViews = [
  'grid', 'payout', 'accumulatedWin', 'balance', 'stake'
];

export default View;
