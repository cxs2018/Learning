import React from "react";
import RouterContext from "./ReactContext";

class Route extends React.Component {
  static contextType = RouterContext;
  render() {
    const { history, location } = this.context;
    const { exact, path, component: RouteComponent } = this.props;
    const match = history.location.pathname === path;
    let renderElement = null;
    let routeProps = { history, location, match };
    if (match) {
      renderElement = <RouteComponent {...routeProps} />;
    }
    return renderElement;
  }
}

export default Route;
