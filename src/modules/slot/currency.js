const CurrencyHandler = function () {
  var amp = 3;

  function toFixed (value, decimalPlaces = 2) {
    return +((value).toFixed(decimalPlaces))
  }

  function computePayout(multiplier, coinValue){
    return amp * multiplier * coinValue
  }

  function setAmplifier (val){
    amp = val;
    return
  }

  function ensureCurrency(payout, previousState){

  }

  return {
    toFixed: toFixed,
    setAmplifier: setAmplifier,
    computePayout: computePayout
  }
}

export default CurrencyHandler