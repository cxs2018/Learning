import React from "./react";

function sayHello() {
  alert("Hello");
}

// let elementJsx = (
//   <button
//     id="sayHello"
//     style={{ backgroundColor: "red", color: "green" }}
//     onClick={sayHello}
//   >
//     say
//     <b>Hello</b>
//   </button>
// );

let element = React.createElement(
  "button",
  {
    id: "sayHello",
    style: {
      backgroundColor: "red",
      color: "green",
    },
    onClick: sayHello,
  },
  "say",
  React.createElement("b", {}, "Hello"),
);

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      odd: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        odd: !this.state.odd,
      });
    }, 1000);
  }

  render() {
    if (this.state.odd) {
      return React.createElement(
        "ul",
        { id: "oldCounter" },
        React.createElement("li", { key: "A" }, "A"),
        React.createElement("li", { key: "B" }, "B"),
        React.createElement("li", { key: "C" }, "C"),
        React.createElement("li", { key: "D" }, "D"),
      );
    } else {
      return React.createElement(
        "ul",
        { id: "newCounter" },
        React.createElement("li", { key: "A" }, "A1"),
        React.createElement("li", { key: "C" }, "C1"),
        React.createElement("li", { key: "B" }, "B1"),
        React.createElement("li", { key: "E" }, "E1"),
        React.createElement("li", { key: "F" }, "F"),
      );
    }
  }
}

// <Counter name="计数器"> --> React.createElement(Counter, { name: "计数器" }) babel jsx 插件
let element2 = React.createElement(Counter, { name: "计数器" });
React.render(element2, document.getElementById("root"));
