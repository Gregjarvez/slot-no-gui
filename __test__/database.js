function makeGlobalDatabase(name) {
  class DataBase {
    constructor(name) {
      this.name = name;
      this.data = new Map();
    }

    find(name, callBack) {
      var value = this.data.get(name);
      return callBack(value);
    }

    insert({value}) {
      this.data.set(this.name, value);
    }

    clear() {
      this.data.clear();
      return Promise.resolve(this);
    }
  }

  return new DataBase(name);
}

export default makeGlobalDatabase;
