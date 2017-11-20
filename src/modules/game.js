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
    this.unregister('logger');
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

    this.clear();
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

  clear() {
    console.clear();
  }

  reset() {
    this.updateState(function() {
      return this.initialState;
    });
    this.notify();
  }

  changeStake(amount) {
    if (amount !== this.state.stake)
      this.state.stake = amount;
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
      unitToUSD: 1.33,
      unitToGBP: 0.75,
      GBP: 'GBP',
      USD: 'USD',
    };
    let stakeToUSD = this.state.stake / conversion.unitToGBP;
    let defaultState = this.state.stake;

    return function(prevState) {
      const params = {
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
            params,
            conversion.unitToGBP,
            conversion.GBP);
      }

      if (prevState.currency === conversion.USD) {
        var update = this.calc(
            params,
            conversion.unitToGBP, conversion.USD);
      }

        return update
    };
  }

  calc(object, rate, unit) {
    const prev = Object.assign({}, object);
    Object.assign(object, Object.keys(prev).reduce((cur, next) => {
      if (next === 'stake') {
        cur[next] = prev[next];
        return cur;
      }
      if (unit === 'GBP') {
        cur[next] = this.toFixed(prev[next] * rate);
        return cur;
      }

      cur[next] = this.toFixed(prev[next] / rate);
      return cur;
    }, {}));

    return object;
  }
}

export default Game;

