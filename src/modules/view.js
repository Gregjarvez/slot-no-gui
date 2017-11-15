class View {
  constructor(view, assignState) {
    this.view = view;
    this.assignState = assignState;

    this.shouldUpdate = this.shouldViewUpdate();
  }

  update(state) {
    this.shouldUpdate(state);
  }

  shouldViewUpdate() {
    var prevState;
    return function shouldUpdate(state) {
      var assignedState = state[this.assignState];

      if (assignedState !== prevState) {
        this.render(assignedState);
        return !1;
      };
      this.render(prevState || ' ');
      prevState = assignedState;
    };
  }

  render(assignedState) {
    this.view(assignedState);
  }

  static clear() {
    return console.clear();
  }
}

export default View;
