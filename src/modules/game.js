import SlotManager from './slotMAnager.js';
import Observers from './observerList.js';
import view, {possibleViews} from '../gui/view.js';

class Game extends SlotManager {
  constructor() {
    super();
    this.observerList = new Observers;
    this.state = {
      grid: this.initialGrid,
      win: false,
      accumulatedWin: 0,
      balance: 1000,
      stake: this.stake,
      payout: 0,
      currency: 'GBP',
    };

    this.conversionChanged = false;
    this.initialState = Object.assign({}, this.state);
    this.views = possibleViews;
    this.observerList.subscribe(this.views.map(view));
    this.spin = this.spin.bind(this);
    this.start();
  }

  start() {
    this.conversion = this.currencyConversion();
    this.notify();
  }



  spin() {
    this.shuffle.call(this);
    var winStats = this.winLines
        .map(this.assertWin(this.state.grid))
        .filter(Boolean);

    if (this.state.balance === 0) {
      this.reset();
      this.notify();
      return;
    }
    this.updateState(this.predicate(winStats));
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

  unregister(view) {
    this.observerList.unregister(view);
  }

  reset() {
    this.updateState(function() {
      return this.initialState;
    });
    this.start();
  }

  changeStake(amount) {
    if (amount !== this.state.stake) {
      this.state.stake = amount;
    }
  }

  setInitialBalance(amount) {
    this.updateState(function() {
      return {
        balance: amount,
      };
    });
  }

  changeCurrency(currency) {
    if (!this.conversionChanged) {
      this.conversionChanged = true;
    }

    this.updateState(function() {
      return {
        currency: currency,
      };
    });
    this.updateState(this.conversion);
    this.notify();
  }

  currencyConversion() {
    let conversion = {
      unitToGBP: 0.75,
      GBP: 'GBP',
      USD: 'USD',
    };
    let stakeToUSD = this.state.stake / conversion.unitToGBP;
    let defaultState = this.state.stake;

    return function(prevState) {
      const state = {
        win: prevState.win,
        accumulatedWin: prevState.accumulatedWin,
        balance: prevState.balance,
        payout: prevState.payout,
        stake: prevState.currency === conversion.GBP
            ? defaultState
            : stakeToUSD,
      };

      if (prevState.currency === conversion.GBP && this.conversionChanged) {
        var update = this.calc(
            state,
            conversion.unitToGBP,
            conversion.GBP);
      }

      if (prevState.currency === conversion.USD) {
        var update = this.calc(
            state,
            conversion.unitToGBP,
            conversion.USD);
      }
        return update;
    };
  }

  calc(object, rate, unit) {
    Object.assign(object, Object.keys(object).reduce((cur, next) => {
      if (next === 'stake') {
        cur[next] = this.toFixed(object[next], 1);
        return cur;
      }
      if (unit === 'GBP') {
        cur[next] = this.toFixed(object[next] * rate, 1);
        return cur;
      }
      cur[next] = this.toFixed(object[next] / rate, 1);
      return cur;
    }, {}));

    return object;
  }
}

export default Game;

