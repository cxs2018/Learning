const createStore = (reducer, preloadedState) => {
  let state = preloadedState;
  let listeners = [];
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((l) => l());
    return action;
  }
  function subscribe(listener) {
    listeners.push(listener);
    // 返回一个取消订阅的方法
    return () => {
      let index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    };
  }
  dispatch({ type: "INIT" });
  return {
    getState,
    dispatch,
    subscribe,
  };
};

export default createStore;
