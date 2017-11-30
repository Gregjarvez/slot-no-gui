const CurrencyHandler = function () {
  var constant = 3;

  function toFixed (value, decimalPlaces = 2) {
    return +((value).toFixed(decimalPlaces))
  }

  function computePayout(multiplier, coinValue){
    return constant * multiplier * coinValue
  }

  return {
    toFixed: toFixed,
    computePayout: computePayout
  }
}

export default CurrencyHandler