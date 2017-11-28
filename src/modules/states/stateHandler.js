var StateHanlder = function (context) {
  var preservedState;

  function getState () {
    return context.state
  }

  function updateState (predicate) {
    var update = predicate.call(this, context.state)

    for (let key in update) {
      if (update.hasOwnProperty(key)) {
        context.state[key] = update[key]
      }
    }
  }

  function setInitialState (initialState) {
    preservedState = Object.assign({}, initialState)
    return initialState;
  }

  return {
    getState: getState,
    updateState: updateState,
    setInitialState: setInitialState,
  }
}

export default StateHanlder