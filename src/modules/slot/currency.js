const CurrencyHandler = function () {
  var constant        = 3
  var currencyChanged = false
  var defaultStake    = null
  var conversion      = {
    rateExchangeRatio: [1, 0.75],
    GBP: 'GBP',
    USD: 'USD',
  }
  /*
  * operand function callback in converter
  * divides at USD because expected value is  of type GBP;
  * 1USD === 0.75GBP
  * */
  var reducers        = {
    USD: converter((value, rate) => toFixed(value / rate, 1)),
    GBP: converter((value, rate) => toFixed(value * rate, 1)),
  }

  function converter (operand) {
    return function reducer (state, rate) {
      return Object.keys(state).reduce((acc, next) => {
        var value = state[next];

        if (next === 'stake' || typeof value !== 'number')
          return acc

        acc[next] = operand(value, rate)
        return acc
      }, {})
    }
  }


  function toFixed (value, decimalPlaces = 2) {
    return +((value).toFixed(decimalPlaces))
  }

  function computePayout (multiplier, coinValue) {
    return constant * multiplier * coinValue
  }

  function onCurrencyChange (initialState) {
    var rate       = conversion.rateExchangeRatio[1];
    var stakeToUSD = toFixed(initialState.stake / rate, 1)

    if (!currencyChanged) {
      defaultStake    = initialState.stake
      currencyChanged = !currencyChanged
    }

    return function converter (ownState, currency) {
      ownState.stake = currency === conversion.GBP
        ? defaultStake
        : stakeToUSD

      return reducers[currency](ownState, rate);
    }
  }

  return {
    toFixed: toFixed,
    computePayout: computePayout,
    onCurrencyChange: onCurrencyChange,
  }
}

function stake () {
  return {
    stake: 10,
    payout: 4.3,
    balance: 600,
    accumulatedWin: 200,
  }
}

export default CurrencyHandler

