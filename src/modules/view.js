class View {
  constructor(stateType){
    this.state = stateType;
    this.fromCacheCheck = this.shouldViewUpdate();
  }

  update(obj) {
    var shouldUpdate = this.fromCacheCheck();
  }

  shouldViewUpdate() {
    var prevUpdate;

    return function (obj) {

    }
  }

  deepCheck(prev, now){
    let hasChanged =  true;
    for(let key in now){
      if(prev.hasOwnProperty(key)){

      }
    }
  }

}
export default View;
