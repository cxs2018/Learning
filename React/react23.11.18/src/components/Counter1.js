import React, { Component } from "react";
import actions from "../store/actions/counter1";
import { connect } from "../react-redux";
class Counter1 extends Component {
  render() {
    let { number, add1, minus1, thunkAdd1, promiseAdd1, promiseAdd2 } =
      this.props;
    return (
      <div>
        <p>{number}</p>
        <button onClick={add1}>+</button>
        <button onClick={minus1}>-</button>
        <button onClick={() => setTimeout(() => add1(), 1000)}>1秒后加1</button>
        <button onClick={thunkAdd1}>thunk+1</button>+
        <button onClick={promiseAdd1}>promise+1</button>+
        <button onClick={promiseAdd2}>promise+2</button>
      </div>
    );
  }
}
let mapStateToProps = (state) => state.counter1;
export default connect(mapStateToProps, actions)(Counter1);
