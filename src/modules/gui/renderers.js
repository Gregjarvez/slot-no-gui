import grid from './canvas.js';
import {totalWin, stake, payout, balance} from './textRenderers.js';

export default {
  grid,
  accumulatedWin: totalWin,
  stake,
  payout,
  balance
};
