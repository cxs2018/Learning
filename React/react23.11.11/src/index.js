import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Route,
  BrowserRouter,
  Switch,
  Link,
  Redirect,
  NavLink,
} from "./react-router-dom";
import Profile from "./components/Profile";
import User from "./components/User";
import Home from "./components/Home";
import Login from "./components/Login";
import Protected from "./components/Protected";

function App() {
  return (
    <HashRouter>
      <ul>
        <li>
          <NavLink
            className="strong"
            style={{ textDecoration: "line-through" }}
            activeStyle={{ color: "red" }}
            to="/"
            exact
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: "red" }} to="/user">
            User
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: "red" }} to="/profile">
            Profile
          </NavLink>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/user" component={User} />
        <Protected path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Redirect to="/" />
      </Switch>
    </HashRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
