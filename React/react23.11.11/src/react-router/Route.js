import React from "react";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";

class Route extends React.Component {
  static contextType = RouterContext;
  render() {
    const { history, location } = this.context;
    const {
      component: RouteComponent,
      computedMatch,
      render,
      children,
    } = this.props;
    const match = computedMatch
      ? computedMatch
      : matchPath(location.pathname, this.props);
    let renderElement = null;
    let routeProps = { history, location, match };
    if (match) {
      if (RouteComponent) {
        renderElement = <RouteComponent {...routeProps} />;
      } else if (render) {
        renderElement = render(routeProps);
      } else if (children) {
        renderElement = children(routeProps);
      }
    } else {
      if (children) {
        renderElement = children(routeProps);
      }
    }
    return renderElement;
  }
}

export default Route;
