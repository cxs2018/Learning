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
  useLocation,
  useParams,
  useHistory,
  useRouteMatch,
} from "./react-router-dom";
import Profile from "./components/Profile";
import User from "./components/User";
import Home from "./components/Home";
import Login from "./components/Login";
import Protected from "./components/Protected";
import NavBar from "./components/NavBar";

function UserDetail() {
  let params = useParams();
  console.log("params", params);
  let location = useLocation();
  console.log("location", location);
  let history = useHistory();
  console.log("history", history);
  return (
    <div>
      User id:{params.id} <br />
      name:{location.state.name}
    </div>
  );
}

function Post() {
  let match = useRouteMatch({
    path: "/post/:id",
    strict: true,
    sensitive: true,
  });
  console.log("match", match);
  return match ? <div>id:{match.params.id}</div> : <div>Not Found</div>;
}

function App() {
  return (
    <BrowserRouter>
      <NavBar title="欢迎光临" />
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
        <li>
          <Link
            to={{
              pathname: "/user/detail/1",
              state: { id: 1, name: "HelloWorld" },
            }}
          >
            用户1详情
          </Link>
        </li>
        <li>
          <Link to="/post/1">贴子</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user" component={User} />
        <Protected path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/user/detail/:id" component={UserDetail} />
        <Route path="/post/:id" component={Post} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
