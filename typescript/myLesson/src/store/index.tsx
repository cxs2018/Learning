import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import promise from "redux-promise";
import thunk from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import history from "@/history";
import rootReducer from "./reducers";

let store = applyMiddleware(
  routerMiddleware(history),
  promise,
  thunk,
  logger,
)(createStore)(rootReducer);

export default store;
