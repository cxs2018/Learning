class Component {
  constructor(props) {
    this.props = props;
  }

  shouldComponentUpdate() {
    return true;
  }

  setState(partialState) {
    this._currentUnit.update(null, partialState);
  }
}

export { Component };
