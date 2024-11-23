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

import axios, { AxiosResponse } from "./axios";
const baseUrl = "http://localhost:8080";
interface User {
  name: string;
  password: string;
}
let user: User = {
  name: "zhufeng",
  password: "123456",
};
axios({
  method: "get",
  url: baseUrl + "/get",
  params: user,
})
  .then((response: AxiosResponse) => {
    console.log(response);
    return response.data;
  })
  .catch((err: any) => {
    console.log(err);
  });
