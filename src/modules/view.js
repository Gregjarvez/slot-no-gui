class View {
  constructor(renderer, assignState) {
    this.renderer = renderer;
    this.assignState = assignState;

    this.shouldUpdate = this.shouldViewUpdate();
  }

  update(state) {
    this.shouldUpdate(state);
  }

  shouldViewUpdate() {
    var assigned = this.assignState;
    return function(state) {
      this.renderer(state[assigned]);
    };
  }

  static clear() {
    return console.clear();
  }
}

export default View;
