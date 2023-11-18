// import { createStore } from "./redux";
// let counterValue = document.getElementById("counter-value");
// let addBtn = document.getElementById("add-btn");
// let minusBtn = document.getElementById("minus-btn");
//
// const ADD = "ADD";
// const MINUS = "MINUS";
// let initState = { number: 0 };
//
// const reducer = (state = initState, action) => {
//   switch (action.type) {
//     case ADD:
//       return { number: state.number + 1 };
//     case MINUS:
//       return { number: state.number - 1 };
//     default:
//       return state;
//   }
// };
// let store = createStore(reducer);
// function render() {
//   counterValue.innerHTML = store.getState().number + "";
// }
// store.subscribe(render);
// render();
// addBtn.addEventListener("click", function () {
//   store.dispatch({ type: ADD });
// });
// minusBtn.addEventListener("click", function () {
//   store.dispatch({ type: MINUS });
// });
import React from "react";
import ReactDOM from "react-dom";
import Counter1 from "./components/Counter1";

ReactDOM.render(<Counter1 />, document.getElementById("root"));
