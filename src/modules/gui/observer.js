class Observer {

  update(state) {
    this.renderer(state[this.assignedState]);
  }
}

export default Observer;