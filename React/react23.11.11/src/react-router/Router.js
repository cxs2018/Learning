import React from "react";
import ReactContext from "./ReactContext";

class Router extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: props.history.location,
    };
    this.unlisten = props.history.listen((location) => {
      this.setState({
        location,
      });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    let value = {
      location: this.state.location,
      history: this.props.history,
    };
    return (
      <ReactContext.Provider value={value}>
        {this.props.children}
      </ReactContext.Provider>
    );
  }
}

export default Router;
