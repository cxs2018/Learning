import { createStore, applyMiddleware } from "redux";
import combineReducer from "@/store/reducers";
import { routerMiddleware } from "connected-react-router";
import history from "@/history";

let store = applyMiddleware(routerMiddleware(history))(createStore)(
  combineReducer,
);

export default store;
