import React from "react";
import { matchPath, __RouterContext } from "./index";

class Switch extends React.Component {
  static contextType = __RouterContext;
  render() {
    const { location } = this.context;
    let element, match;
    // React.Children 类似 直接遍历 children，但是可以兼容 children的不同情况，如undefined、单个对象、数组
    React.Children.forEach(this.props.children, (child) => {
      if (!match && React.isValidElement(child)) {
        element = child;
        match = matchPath(location.pathname, child.props);
      }
    });
    return match ? React.cloneElement(element, { computedMatch: match }) : null;
  }
}

export default Switch;
