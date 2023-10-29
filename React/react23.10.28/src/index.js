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

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 0,
    };
  }

  handleClick = () => {
    this.setState(
      {
        number: this.state.number + 1,
      },
      () => {
        console.log("cb1", this.state.number);
      },
    );
    console.log(this.state.number);
    this.setState(
      (state) => {
        return {
          number: state.number + 1,
        };
      },
      () => {
        console.log("cb2", this.state.number);
      },
    );
    console.log(this.state.number);
    Promise.resolve().then(() => {
      console.log(this.state.number);
      this.setState(
        {
          number: this.state.number + 1,
        },
        () => {
          console.log("cb3", this.state.number);
        },
      );
      console.log(this.state.number);
      this.setState(
        {
          number: this.state.number + 1,
        },
        () => {
          console.log("cb4", this.state.number);
        },
      );
      console.log(this.state.number);
    });
  };

  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>
          <span>+</span>
        </button>
      </div>
    );
  }
}

// console.log("element", element, JSON.stringify(element, null, 2));

ReactDOM.render(<Counter name="counter" />, document.getElementById("root"));
