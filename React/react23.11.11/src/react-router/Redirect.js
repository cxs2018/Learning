import React from "react";
import Lifecycle from "./Lifecycle";
import RouterContext from "./RouterContext";

function Redirect({ to }) {
  return (
    <RouterContext.Consumer>
      {(value) => <Lifecycle onMount={() => value.history.push(to)} />}
    </RouterContext.Consumer>
  );
}

export default Redirect;
