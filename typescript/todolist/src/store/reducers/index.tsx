import counter, { CounterState } from "./counter";
import todos, { TodosState } from "./todos";
import { combineReducers } from "redux";
import history from "@/history";
import { connectRouter } from "connected-react-router";

let reducers = {
  counter,
  todos,
  router: connectRouter(history),
};

type ReducersType = typeof reducers;
// 合并后的状态类型
// type CombinedState = {
//   [K in keyof ReducersType]: ReturnType<ReducersType[K]>;
// };
type CombinedState = ReturnType<typeof combineReducer>;

export { CombinedState, CounterState, TodosState };

let combineReducer = combineReducers(reducers);

export default combineReducer;
