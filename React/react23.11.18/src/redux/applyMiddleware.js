function applyMiddleware(middleware) {
  return function (createStore) {
    return function (reducer, preloadedState) {
      let store = createStore(reducer, preloadedState);
      let dispatch = middleware(store)(store.dispatch);
      return {
        ...store,
        dispatch,
      };
    };
  };
}

export default applyMiddleware;
