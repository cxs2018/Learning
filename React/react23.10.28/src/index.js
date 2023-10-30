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
    console.log("father constructor");
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
    // this.setState(
    //   (state) => {
    //     return {
    //       number: state.number + 1,
    //     };
    //   },
    //   () => {
    //     console.log("cb2", this.state.number);
    //   },
    // );
    // console.log(this.state.number);
    // Promise.resolve().then(() => {
    //   console.log(this.state.number);
    //   this.setState(
    //     {
    //       number: this.state.number + 1,
    //     },
    //     () => {
    //       console.log("cb3", this.state.number);
    //     },
    //   );
    //   console.log(this.state.number);
    //   this.setState(
    //     {
    //       number: this.state.number + 1,
    //     },
    //     () => {
    //       console.log("cb4", this.state.number);
    //     },
    //   );
    //   console.log(this.state.number);
    // });
  };

  componentWillMount() {
    console.log("father componentWillMount");
  }

  componentDidMount() {
    console.log("father componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("father shouldComponentUpdate", nextProps, nextState);
    return nextState.number % 2 === 0;
  }

  componentWillUpdate() {
    console.log("father componentWillUpdate");
  }

  componentDidUpdate() {
    console.log("father componentDidUpdate");
  }

  render() {
    console.log("father render");
    return (
      <div>
        <p>{this.state.number}</p>
        {this.state.number === 4 ? null : (
          <ChildCounter count={this.state.number} />
        )}
        <button onClick={this.handleClick}>
          <span>+</span>
        </button>
      </div>
    );
  }
}

class ChildCounter extends React.Component {
  constructor(props) {
    super(props);
    console.log("child constructor");
  }
  componentWillMount() {
    console.log("child componentWillMount");
  }

  componentDidMount() {
    console.log("child componentDidMount");
  }

  componentWillReceiveProps(newProps) {
    console.log("child componentWillReceiveProps");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("child shouldComponentUpdate", nextProps, nextState);
    return nextProps.count % 3 === 0;
  }

  componentWillUpdate() {
    console.log("child componentWillUpdate");
  }

  componentDidUpdate() {
    console.log("child componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("child componentWillUnmount");
  }

  render() {
    console.log("child render");
    return <div>{this.props.count}</div>;
  }
}

// console.log("element", element, JSON.stringify(element, null, 2));

ReactDOM.render(<Counter name="counter" />, document.getElementById("root"));
