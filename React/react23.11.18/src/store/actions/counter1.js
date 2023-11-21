import * as types from "../action-types";

const actions = {
  add1() {
    return { type: types.ADD1 };
  },
  minus1() {
    return { type: types.MINUS1 };
  },
  thunkAdd1() {
    return function (dispatch, getState) {
      setTimeout(function () {
        dispatch({ type: types.ADD1 });
      }, 2000);
    };
  },
  promiseAdd1() {
    return {
      type: types.ADD1,
      payload: new Promise((resolve, reject) => {
        setTimeout(() => {
          let result = Math.random();
          if (result > 0.5) {
            resolve(result);
          } else {
            reject(result);
          }
        }, 1000);
      }),
    };
  },
  promiseAdd2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ type: types.ADD1 });
      }, 1000);
    });
  },
};
export default actions;
