function thunk({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      if (typeof action === "function") {
        return action(dispatch, getState);
      }
      return next(action);
    };
  };
}

export default thunk;
