import React from "react";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";

function useParams() {
  let match = React.useContext(RouterContext).match;
  return match ? match.params : {};
}

function useLocation() {
  return React.useContext(RouterContext).location;
}

function useHistory() {
  return React.useContext(RouterContext).history;
}

function useRouteMatch(path) {
  const location = useLocation();
  let match = React.useContext(RouterContext).match;
  return path ? matchPath(location.pathname, path) : match;
}

export { useParams, useLocation, useHistory, useRouteMatch };
