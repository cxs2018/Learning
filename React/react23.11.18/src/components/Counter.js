import React, { Component } from "react";
import { createStore, bindActionCreators } from "../redux";
const ADD = "ADD";
const MINUS = "MINUS";
const reducer = (state = initState, action) => {
  switch (action.type) {
    case ADD:
      return { number: state.number + (action.payload ?? 1) };
    case MINUS:
      return { number: state.number - (action.payload ?? 1) };
    default:
      return state;
  }
};
let initState = { number: 0 };
const store = createStore(reducer, initState);
function add(event, num) {
  return { type: "ADD", payload: num };
}
function minus(event, num) {
  return { type: "MINUS", payload: num };
}
const actions = { add, minus };
const boundActions = bindActionCreators(actions, store.dispatch);
export default class Counter extends Component {
  unsubscribe;
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() =>
      this.setState({ number: store.getState().number }),
    );
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={(event) => boundActions.add(event, 5)}>+</button>
        <button onClick={(event) => boundActions.minus(event, 10)}>-</button>
      </div>
    );
  }
}
