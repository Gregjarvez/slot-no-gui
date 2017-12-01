import renderers from './renderers.js';

class ViewDescriptor{
  constructor(state) {
    this.assignedState = state;
    this.renderer = renderers[state];
  }
  update(state) {
    this.renderer(state[this.assignedState]);
  }
}


export default (state) => new ViewDescriptor(state);
