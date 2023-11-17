import React from "react";
import RouterContext from "./RouterContext";
import Lifecycle from "./Lifecycle";

function Prompt({ when, message }) {
  return (
    <RouterContext.Consumer>
      {(value) => {
        if (!when) return null;
        return (
          <Lifecycle
            onMount={(self) => (self.release = value.history.block(message))}
            onUnmount={(self) => self.release()}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}

{
  //类组件
  class Prompt extends React.Component {
    static contextType = RouterContext;
    componentDidMount() {
      const block = this.context.history.block;
      this.release = block(this.props.message);
    }
    componentWillUnmount() {
      this.release();
    }
    render() {
      return null;
    }
  }
}

{
  //函数组件
  function Prompt(props) {
    let value = React.useContext(RouterContext);
    React.useEffect(() => {
      return value.history.block(props.message);
    });
    return null;
  }
}

export default Prompt;
