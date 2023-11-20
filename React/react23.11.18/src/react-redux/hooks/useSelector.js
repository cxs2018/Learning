import React from "react";
import ReactReduxContext from "../ReactReduxContext";

function useSelectorWithStore(selector, store) {
  let state = store.getState();
  let selectedState = selector(state);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
  React.useEffect(() => {
    return store.subscribe(forceUpdate);
  }, [store]);
  return selectedState;
}

function useSelector(selector) {
  const { store } = React.useContext(ReactReduxContext);
  return useSelectorWithStore(selector, store);
}

export default useSelector;
