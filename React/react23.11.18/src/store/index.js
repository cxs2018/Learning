import { applyMiddleware, createStore } from "../redux";
import reducer from "./reducers";
import logger from "./logger";
import thunk from "./thunk";
import promise from "./promise";
// const store = createStore(reducer, {
//   counter1: { number: 0 },
//   counter2: { number: 0 },
// });
// 改写 dispatch 方法
// let dispatch = store.dispatch;
// store.dispatch = function (action) {
//   console.log(store.getState());
//   dispatch(action);
//   console.log(store.getState());
// };

let store = applyMiddleware(promise, thunk, logger)(createStore)(reducer);

export default store;
