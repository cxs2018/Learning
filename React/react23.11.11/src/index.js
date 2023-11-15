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

function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <button>
            <Link to="/">首页</Link>
          </button>
        </li>
        <li>
          <button>
            <Link to="/user/200/hello">用户管理</Link>
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
        <Route path="/user/:id/:name" component={User} />
        <Route path="/profile" component={Profile} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
