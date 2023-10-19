import React from "react";
import ReactDOM from "react-dom";

const dom = React.createElement(
  "h1",
  {
    id: "title",
  },
  "hello",
);
console.log("dom", dom);

ReactDOM.render(dom, document.getElementById("root"));
