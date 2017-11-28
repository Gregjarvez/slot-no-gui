export default (function(){
  let instance = null;

  class Events {
    constructor (){
      this.buffer = new Map();
    }

    on(eventType, fnc){
      if(!this.buffer.has(eventType)){
        this.buffer.set(eventType, fnc);
        return this;
      }
    }
    dispatch(eventType){
      var func = this.buffer.get(eventType)
      func();
      return false;
    }

  }
  return {
    getInstance(){
      if(!instance){
        instance = new Events();
      }
      return instance
    }
  }
}())





