import * as React from "react";
import * as ReactDOM from "react-dom";
import Counter from "./components/Counter";
import Todos from "./components/Todos";
import store from "@/store";
import { Provider } from "react-redux";
import { Route, Link, BrowserRouter } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import history from "./history";

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <BrowserRouter>
        <React.Fragment>
          <ul>
            <li>
              <Link to={"/counter/counterName"}>counter</Link>
            </li>
            <li>
              <Link to={{ pathname: "/todos", state: { name: "todosName" } }}>
                todos
              </Link>
            </li>
          </ul>
          <Route path={"/counter/:name"} component={Counter} />
          <Route path={"/todos"} component={Todos} />
        </React.Fragment>
      </BrowserRouter>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root"),
);
