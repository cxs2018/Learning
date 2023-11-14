import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Route, BrowserRouter } from "./react-router-dom";
import Profile from "./components/Profile";
import User from "./components/User";
import Home from "./components/Home";

function App() {
  return (
    <BrowserRouter>
      <Route exact={false} path="/" component={Home} />
      <Route path="/user/:id/:name" component={User} />
      <Route path="/profile" component={Profile} />
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
