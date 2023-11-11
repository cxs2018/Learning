import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route } from "./react-router-dom";
import Profile from "./components/Profile";
import User from "./components/User";
import Home from "./components/Home";

function App() {
  return (
    <HashRouter>
      <Route exact path="/" component={Home} />
      <Route path="/user" component={User} />
      <Route path="/profile" component={Profile} />
    </HashRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
