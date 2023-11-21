function add1(str) {
  return "1" + str;
}
function add2(str) {
  return "2" + str;
}
function add3(str) {
  return "3" + str;
}

function compose1(...funcs) {
  return function (args) {
    for (let i = funcs.length - 1; i >= 0; i--) {
      args = funcs[i](args);
    }
    return args;
  };
}

function compose(...funcs) {
  return funcs.reduce(
    (a, b) =>
      (...args) =>
        a(b(...args)),
  );
}
//
// let fn = compose1(add3, add2, add1);
// let result = fn("zhufeng");
// console.log(result);

{
  function compose(...funcs) {
    return funcs.reduce(
      (a, b) =>
        (...args) =>
          a(b(...args)),
    );
  }
  let promise = (next) => (action) => {
    console.log("promise");
    next(action);
  };
  let thunk = (next) => (action) => {
    console.log("thunk");
    next(action);
  };
  let logger = (next) => (action) => {
    console.log("logger");
    next(action);
  };

  let chain = [promise, thunk, logger];
  let composed = compose(...chain);
  let dispatch = () => {
    console.log("原始的dispatch");
  };
  let newDispatch = composed(dispatch);
  newDispatch({ type: "add" });
}

export default compose;
