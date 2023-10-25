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
      number: 0,
    };
  }

  componentDidMount() {
    console.log("counter componentDidMount");
    setInterval(() => {
      this.setState({
        number: this.state.number + 1,
      });
    }, 1000);
  }

  componentWillUnMount() {
    console.log("counter componentWillUnMount");
  }

  increment = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  render() {
    let p = React.createElement(
      "p",
      { style: { color: "red" } },
      this.props.name,
      this.state.number,
    );
    let button = React.createElement(
      "button",
      { onClick: this.increment },
      "+",
    );
    // return React.createElement("div", { id: "Counter" }, p, button);
    return this.state.number;
  }
}

// <Counter name="计数器"> --> React.createElement(Counter, { name: "计数器" }) babel jsx 插件
let element2 = React.createElement(Counter, { name: "计数器" });
React.render(element2, document.getElementById("root"));
