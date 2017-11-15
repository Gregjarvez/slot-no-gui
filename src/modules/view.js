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
    var assigned = this.assignState;
    return function(state) {
      this.render(state[assigned]);
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
