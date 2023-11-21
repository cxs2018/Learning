/**
 * 合并reducers {counter1: counter1Reducer, counter2: counter2Reducer}
 * @param reducers
 * @returns {function({}=, *): {}}
 * @constructor
 */
function combineReducers(reducers) {
  return function (state = {}, action) {
    let nextState = {};
    for (const key in reducers) {
      nextState[key] = reducers[key](state[key], action);
    }
    return nextState;
  };
}

export default combineReducers;
