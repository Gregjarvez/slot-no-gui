class Publisher {
  constructor() {
    this.observers = [];
  }

  subscribe(observers) {
    this.observers = [
      ...this.observers,
      ...observers
    ]
  }

  update(param) {
    this.observers.forEach(function(obs) {
      obs.update.call(obs, param);
    });
  }
}

export default Publisher;
