function logger({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      console.log("prev state", getState());
      next(action);
      console.log("next state", getState());
      return action;
    };
  };
}

export default logger;
