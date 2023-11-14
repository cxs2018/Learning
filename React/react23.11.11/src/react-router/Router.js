import React from "react";
import RouterContext from "./ReactContext";

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

  static computeRootMatch(pathname) {
    return { path: "/", url: "/", isExact: pathname === "/", params: {} };
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    let value = {
      location: this.state.location,
      history: this.props.history,
      match: Router.computeRootMatch(this.state.location.pathname),
    };
    return (
      <RouterContext.Provider value={value}>
        {this.props.children}
      </RouterContext.Provider>
    );
  }
}

export default Router;
