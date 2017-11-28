const CurrencyHandler = function () {

  function toFixed (value, decimalPlaces = 2) {
    return +((value).toFixed(decimalPlaces))
  }

  return {
    toFixed,
  }
}

export default CurrencyHandler