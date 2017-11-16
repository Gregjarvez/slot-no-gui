function makeGlobalDatabase() {

  class DataBase {
    constructor() {
      this.data = new Map();
    }

    find(name, callBack) {
      var results = this.data.get(name);
      return callBack(results);
    }

    insert({game}) {
      this.data.set('game', game);
    }

    clear() {
      this.data.clear();
      return Promise.resolve(this);
    }
  }

  return new DataBase();
}

export default makeGlobalDatabase;
