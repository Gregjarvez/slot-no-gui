const RNG = function ({min, max}) {
  var maxRange = max
  var minRange = min

  function generateRandomArray (len) {
    var array = []
    while (len--) {
      array.push(randomBetween())
    }

    return array
  }

  function randomBetween () {
    return Math.floor(
      Math.random() * (maxRange - (minRange + 1)) + minRange,
    )
  }

  return {
    generateRandomArray: generateRandomArray,
  }
}

export default RNG



