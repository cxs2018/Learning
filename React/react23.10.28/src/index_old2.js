import React from "react";
import ReactDOM from "react-dom";
let ThemeContext = React.createContext();
console.log(ThemeContext);
const { Provider, Consumer } = ThemeContext;
let style = { margin: "5px", padding: "5px" };
function Title(props) {
  console.log("Title");
  return (
    <Consumer>
      {(contextValue) => (
        <div style={{ ...style, border: `5px solid ${contextValue.color}` }}>
          Title
        </div>
      )}
    </Consumer>
  );
}
class Header extends React.Component {
  static contextType = ThemeContext;
  render() {
    console.log("Header");
    return (
      <div style={{ ...style, border: `5px solid ${this.context.color}` }}>
        Header
        <Title />
      </div>
    );
  }
}
function Content() {
  console.log("Content");
  return (
    <Consumer>
      {(contextValue) => (
        <div style={{ ...style, border: `5px solid ${contextValue.color}` }}>
          Content
          <button
            style={{ color: "red" }}
            onClick={() => contextValue.changeColor("red")}
          >
            变红
          </button>
          <button
            style={{ color: "green" }}
            onClick={() => contextValue.changeColor("green")}
          >
            变绿
          </button>
        </div>
      )}
    </Consumer>
  );
}
class Main extends React.Component {
  static contextType = ThemeContext;
  render() {
    console.log("Main");
    return (
      <div style={{ ...style, border: `5px solid ${this.context.color}` }}>
        Main
        <Content />
      </div>
    );
  }
}

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: "black" };
  }
  changeColor = (color) => {
    this.setState({ color });
  };
  render() {
    console.log("Page");
    let contextValue = {
      color: this.state.color,
      changeColor: this.changeColor,
    };
    return (
      <Provider value={contextValue}>
        <div
          style={{
            ...style,
            width: "250px",
            border: `5px solid ${this.state.color}`,
          }}
        >
          Page
          <Header />
          <Main />
        </div>
      </Provider>
    );
  }
}

const loading = (message) => (OldComponent) => {
  return class extends React.Component {
    render() {
      const state = {
        show: () => {
          console.log("show", message);
        },
        hide: () => {
          console.log("hide", message);
        },
      };
      return (
        <OldComponent
          {...this.props}
          {...state}
          {...{ ...this.props, ...state }}
        />
      );
    }
  };
};

@loading("消息")
class Hello extends React.Component {
  render() {
    return (
      <div>
        hello<button onClick={this.props.show}>show</button>
        <button onClick={this.props.hide}>hide</button>
      </div>
    );
  }
}
let LoadingHello = loading("消息")(Hello);

ReactDOM.render(<LoadingHello />, document.getElementById("root"));
