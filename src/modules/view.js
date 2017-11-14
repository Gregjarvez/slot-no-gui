class View {
  constructor(state, view) {
    Object.assign(this, {
      view: view,
      state: state,
    });

    this.shouldUpdate = this.shouldViewUpdate();
  }

  update(state) {
    this.shouldUpdate(state);
  }

  shouldViewUpdate() {
    var prevState;
    return function shouldUpdate(state) {
      state === prevState && this.render(state);
      prevState = state;
    };
  }

  render(state) {
    this.view(state);
  }
}

export default View;
