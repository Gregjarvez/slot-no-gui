import views from './renderers.js';

var renderer = {
  grid: views.grid,
  payout: views.payout,
  stake: views.stake,
  accumulatedWin: views.totalWin,
  balance: views.balance,
};

class ViewDescriptor{
  constructor(state) {
    this.assignedState = state;
    this.renderer = renderer[state];
  }
  update(state) {
    this.renderer(state[this.assignedState]);
  }
}

function View(state) {
  return new ViewDescriptor(state);
};

export default View;
