import React from "react";
import ReactDOM from "react-dom";
import {
  HashRouter,
  Route,
  BrowserRouter,
  Switch,
  Link,
  Redirect,
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
          <button>
            <Link to="/">首页</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/user">用户管理</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/profile">个人中心</Link>
          </button>
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
