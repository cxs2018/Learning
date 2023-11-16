import React from "react";
import { Redirect, Route } from "../react-router";

function Protected(props) {
  const { path, component: RouteComponent } = props;
  return (
    <Route
      path={path}
      render={(routeProps) => {
        return localStorage.getItem("login") ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: path,
              },
            }}
          />
        );
      }}
    />
  );
}

export default Protected;
