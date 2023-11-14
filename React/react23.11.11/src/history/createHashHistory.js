function createHashHistory() {
  let action;
  let listeners = [];
  let historyStack = [];
  let historyIndex = -1;
  let state;
  function listen(listener) {
    listeners.push(listener);
    return () => {
      let idx = listeners.indexOf(listener);
      listeners.splice(idx, 1);
    };
  }
  window.addEventListener("hashchange", () => {
    let pathname = window.location.hash.slice(1);
    Object.assign(history, { action, location: { pathname, state } });
    if (!action || action === "PUSH") {
      historyStack[++historyIndex] = history.location;
    } else if (action === "REPLACE") {
      historyStack[historyIndex] = history.location;
    }
    listeners.forEach((listener) => listener(history.location));
  });
  function push(pathname, nextState) {
    action = "PUSH";
    if (typeof pathname === "object") {
      state = pathname.state;
      pathname = pathname.pathname;
    } else {
      state = nextState;
    }
    window.location.hash = pathname;
  }
  function replace(pathname, nextState) {
    action = "REPLACE";
    if (typeof pathname === "object") {
      state = pathname.state;
      pathname = pathname.pathname;
    } else {
      state = nextState;
    }
    window.location.hash = pathname;
  }
  function go(n) {
    action = "POP";
    historyIndex += n;
    let nextLocation = historyStack[historyIndex];
    state = nextLocation.state;
    window.location.hash = nextLocation.pathname;
  }
  function goBack() {
    go(-1);
  }
  function goForward() {
    go(1);
  }
  const history = {
    action: "POP",
    location: {
      pathname: "/",
      state: undefined,
    },
    go,
    goBack,
    goForward,
    listen,
    push,
    replace,
  };
  action = "PUSH";
  window.location.hash = window.location.hash
    ? window.location.hash.slice(1)
    : "/";
  return history;
}

export default createHashHistory;
