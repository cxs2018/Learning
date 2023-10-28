import React from "./react";
import ReactDOM from "./react-dom";

const element = (
  <div className="title" style={{ color: "red", backgroundColor: "green" }}>
    hello<span>world</span>
  </div>
);

const FunctionComponent = function (props) {
  return <h1>Hello,{props.name} </h1>;
};

// console.log("element", element, JSON.stringify(element, null, 2));

ReactDOM.render(
  <FunctionComponent name="world" />,
  document.getElementById("root"),
);
