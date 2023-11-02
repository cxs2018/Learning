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
    // this.forceUpdate();
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
    // return nextState.number % 2 === 0;
    return true;
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
        {/*{this.state.number === 4 ? null : (*/}
        {/*  <ChildCounter count={this.state.number} />*/}
        {/*)}*/}
        <button onClick={this.handleClick}>
          <span>+</span>
        </button>
        {/*<ChildCounter2 count={this.state.number} />*/}
        <ChildCounter3 number={this.state.number} />
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

function ChildCounter2(props) {
  return <div>{props.count}</div>;
}

class ChildCounter3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: 0 };
  }

  /**
   * props改变，改变自身state -> 类似之前写的props驱动state更新，在willUpdate里实现
   * @param nextProps
   * @param prevState
   * @returns {{number: number}|null}
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps", nextProps, prevState);
    const { number } = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (number === 0) {
      return { number: 10 };
    } else if (number % 2 === 0) {
      return { number: number * 2 };
    } else {
      return { number: number * 3 };
    }
    // 否则，对于state不进行任何操作
    return null;
  }
  render() {
    console.log("child-render", this.state);
    return <div>{this.state.number}</div>;
  }
}

// console.log("element", element, JSON.stringify(element, null, 2));

let number = 0;

class Counter2 extends React.Component {
  state = { number: 0, list: [] };
  ref = React.createRef();
  getSnapshotBeforeUpdate() {
    return this.ref.current.scrollHeight;
  }

  componentDidUpdate(prevProps, prevState, snapshotData) {
    console.log(
      "componentDidUpdate",
      prevProps,
      prevState,
      this.ref.current.scrollHeight - snapshotData,
    );
  }

  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
      list: [...this.state.list, this.state.list.length],
    });
  };

  render() {
    return (
      <div>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+</button>
        <ul ref={this.ref}>
          {this.state.list.map((item) => (
            <li>{item}</li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<Counter2 name="counter" />, document.getElementById("root"));
