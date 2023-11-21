function promise({ getState, dispatch }) {
  return function (next) {
    return function (action) {
      if (action.then && typeof action.then === "function") {
        action.then(dispatch).catch(dispatch);
      } else if (action.payload && typeof action.payload.then === "function") {
        action.payload
          .then((result) => dispatch({ ...action, payload: result }))
          .catch((error) => {
            dispatch({ ...action, payload: error, error: true });
            return Promise.reject(error);
          });
      } else {
        next(action);
      }
    };
  };
}

export default promise;
