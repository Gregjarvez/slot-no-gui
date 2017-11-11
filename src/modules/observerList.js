class Observer {
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

  remove(index) {
    this.observers.splice(index, 1);
  }

  update(context, params) {
    this.observers.forEach(function(obs) {
        obs.update.call(context, params);
    });
  }

  find(predicate) {
    return this.observers.find(predicate);
  }
}


export default Observer;
