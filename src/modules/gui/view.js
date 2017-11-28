import views from './renderers.js';
import Observer from './observer.js';

var renderer = {
  grid: views.grid,
  payout: views.payout,
  stake: views.stake,
  accumulatedWin: views.totalWin,
  balance: views.balance,
};

class ViewDescriptor extends Observer {
  constructor(state) {
    super();
    this.assignedState = state;
    this.renderer = renderer[state];
  }
}

function View(state) {
  return new ViewDescriptor(state);
};

export default View;
