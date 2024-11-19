import * as React from "react";
import * as ReactDOM from "react-dom";
import Counter from "./components/Counter";
import Todos from "./components/Todos";
ReactDOM.render(
  <>
    <Counter number={100} />
    <Todos />
  </>,
  document.getElementById("root"),
);
