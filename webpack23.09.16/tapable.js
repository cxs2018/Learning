const {
  SyncHook,
  SyncBailHook,
  SyncWaterfallHook,
  SyncLoopHook,
} = require("tapable");

{
  const syncHook = new SyncHook(["name", "age"]);
  syncHook.tap("1", (name, age) => {
    console.log("1", name, age);
  });
  syncHook.tap("2", (name, age) => {
    console.log("2", name, age);
    return "2";
  });
  syncHook.tap("3", (name, age) => {
    console.log("3", name, age);
  });

  syncHook.call("cxs", 24);
}

{
  const hook = new SyncBailHook(["name", "age"]);
  hook.tap("1", (name, age) => {
    console.log("1", name, age);
  });
  hook.tap("2", (name, age) => {
    console.log("2", name, age);
    return "2";
  });
  hook.tap("3", (name, age) => {
    console.log("3", name, age);
  });

  hook.call("cxs", 24);
}

{
  const hook = new SyncWaterfallHook(["name", "age"]);
  hook.tap("1", (name, age) => {
    console.log("1", name, age);
    return "A";
  });
  hook.tap("2", (name, age) => {
    console.log("2", name, age);
    return "B";
  });
  hook.tap("3", (name, age) => {
    console.log("3", name, age);
  });

  hook.call("cxs", 24);
}

{
  const hook = new SyncLoopHook(["name", "age"]);
  let counter1 = 0;
  let counter2 = 0;
  let counter3 = 0;
  hook.tap("A", (name, age) => {
    console.log("A", "counterA", counter1, name, age);
    if (++counter1 == 1) {
      counter1 = 0;
      return;
    }
    return "A";
  });
  hook.tap("B", (name, age) => {
    console.log("B", "counterB", counter2, name, age);
    if (++counter2 == 2) {
      counter2 = 0;
      return;
    }
    return "B";
  });
  hook.tap("C", (name, age) => {
    console.log("C", "counterC", counter3, name, age);
    if (++counter3 == 3) {
      counter3 = 0;
      return;
    }
    return "C";
  });

  hook.call("cxs", 24);
}
