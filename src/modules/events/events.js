export default (function () {
  let instance = null

  class Events {
    constructor () {
      this.events = new Map()
    }

    on (eventType, fnc) {
      !this.events.has(eventType) && this.events.set(eventType, fnc)
      return this
    }

    dispatch (eventType, ...args) {
      var func = this.events.get(eventType)
      func.apply(null, args);
      return false
    }

  }

  return {
    getInstance () {
      if (!instance) {
        instance = new Events()
      }
      return instance
    },
  }
}())





