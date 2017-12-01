var StateHanlder = function (context) {
  var preservedState

  function getInititalState () {
    return preservedState
  }

  function updateState (predicate) {
    var update = predicate.call(this, context.state)

    for (let key in update) {
      update.hasOwnProperty(key) &&
      (context.state[key] = update[key])
    }
  }

  function setInitialState (initialState) {
    preservedState = Object.assign({}, initialState)
    return initialState
  }

  return {
    updateState: updateState,
    setInitialState: setInitialState,
    getInititalState: getInititalState,
  }
}

export default StateHanlder