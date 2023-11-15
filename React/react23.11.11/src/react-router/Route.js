import React from "react";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";

class Route extends React.Component {
  static contextType = RouterContext;
  render() {
    const { history, location } = this.context;
    const { component: RouteComponent, computedMatch } = this.props;
    const match = computedMatch
      ? computedMatch
      : matchPath(location.pathname, this.props);
    let renderElement = null;
    let routeProps = { history, location, match };
    if (match) {
      renderElement = <RouteComponent {...routeProps} />;
    }
    return renderElement;
  }
}

export default Route;
