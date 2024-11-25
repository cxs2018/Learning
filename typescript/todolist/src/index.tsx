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

import axios, { AxiosResponse, AxiosRequestConfig } from "./axios";
const baseUrl = "http://localhost:8080";
interface User {
  name: string;
  password: string;
}
let user: User = {
  name: "zhufeng",
  password: "16",
};

console.time("cost");
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers && (config.headers.name += "1");
  return config;
});
let request = axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers && (config.headers.name += "2");
  return config;
});
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  config.headers && (config.headers.name += "3");
  return config;
});
// axios.interceptors.request.use(
//   (
//     config: AxiosRequestConfig,
//   ): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
//     return new Promise((resolve, reject) => {
//       setTimeout(() => {
//         config.headers && (config.headers.name += "4");
//         console.timeEnd("cost");
//         resolve(config);
//       }, 3000);
//     });
//   },
// );
axios.interceptors.request.eject(request);
let response = axios.interceptors.response.use(
  (response: AxiosResponse<User>) => {
    response.data.name += "1";
    return response;
  },
);
axios.interceptors.response.use((response: AxiosResponse<User>) => {
  response.data.name += "2";
  return response;
});
axios.interceptors.response.use((response: AxiosResponse<User>) => {
  response.data.name += "3";
  return response;
});
axios.interceptors.response.eject(response);
const CancelToken = axios.cancelToken;
const source = CancelToken.source();

axios({
  method: "post",
  url: baseUrl + "/post",
  headers: {
    "content-type": "application/json",
    name: "cxs",
  },
  cancelToken: source.token,
  data: user,
})
  .then((response: AxiosResponse<User>) => {
    console.log(response);
    return response.data;
  })
  .catch((err: any) => {
    console.log("err: ", err);
  });
// source.cancel("用户取消了请求");
