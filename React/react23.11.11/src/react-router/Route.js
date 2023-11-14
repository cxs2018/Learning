import React from "react";
import RouterContext from "./ReactContext";
import matchPath from "./matchPath";

class Route extends React.Component {
  static contextType = RouterContext;
  render() {
    const { history, location } = this.context;
    const { exact, path, component: RouteComponent } = this.props;
    const match = matchPath(location.pathname, this.props);
    let renderElement = null;
    let routeProps = { history, location, match };
    if (match) {
      renderElement = <RouteComponent {...routeProps} />;
    }
    return renderElement;
  }
}

export default Route;
