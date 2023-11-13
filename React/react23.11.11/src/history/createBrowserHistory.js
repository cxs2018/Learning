function createBrowserHistory() {
  const globalHistory = window.history;
  let action;
  let state;
  let listeners = [];
  (function (history) {
    let oldPushState = history.pushState;
    history.pushState = function (pathname, _, state) {
      oldPushState.apply(history, arguments);
      if (typeof window.onpushstate === "function") {
        window.onpushstate(
          new CustomEvent("pushstate", { detail: { pathname, state } }),
        );
      }
    };
  })(globalHistory);
  function listen(listener) {
    listeners.push(listener);
    return () => {
      let idx = listeners.indexOf(listener);
      listeners.splice(idx, 1);
    };
  }
  function notify(newState) {
    Object.assign(history, newState);
    listeners.forEach((listener) => listener(history.location));
  }
  function push(pathname, nextState) {
    action = "PUSH";
    if (typeof pathname === "object") {
      state = pathname.state;
      pathname = pathname.pathname;
    } else {
      state = nextState;
    }
    globalHistory.pushState(state, null, pathname);
    let location = { state, pathname };
    notify({ state, location });
  }
  function go(n) {
    globalHistory.go(n);
  }
  function goBack() {
    console.log("goback");
    globalHistory.back();
  }
  function goForward() {
    console.log("goForward");
    globalHistory.forward();
  }
  // 自己实现的 onpushstate 方法
  window.onpushstate = (event) => {
    console.log("onpushstate", event);
  };
  // 浏览器自带的 onpopstate 方法
  window.onpopstate = (event) => {
    console.log("onpopstate", event);
    notify({
      action: "POP",
      location: {
        pathname: window.location.pathname,
        state: globalHistory.state,
      },
    });
  };
  const history = {
    action: "POP",
    location: {
      pathname: window.location.pathname,
      state: globalHistory.state,
    },
    go,
    goBack,
    goForward,
    listen,
    push,
  };
  console.log("constructor");
  return history;
}

export default createBrowserHistory;
