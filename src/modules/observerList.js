class Observers {
  constructor() {
    this.observers = [];
  }

  subscribe(observer) {
    var context = this;

    if (Array.isArray(observer)) {
      observer.forEach(function(obs) {
        this.observers.push(obs);
      }, context);

      return this;
    }

    this.observers.push(observer);
    return this;
  }

  update(param) {
    this.observers.forEach(function(obs) {
        obs.update.call(obs, param);
    });
  }
}


export default Observers;
