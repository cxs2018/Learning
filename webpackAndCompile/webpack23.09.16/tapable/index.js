const SyncHook = require("./SyncHook");

const syncHook = new SyncHook(["name", "age"]);
syncHook.tap("1", (name, age) => {
  console.log("1", name, age);
});
syncHook.tap("2", (name, age) => {
  console.log("2", name, age);
});
syncHook.tap("3", (name, age) => {
  console.log("3", name, age);
});

syncHook.call("cxs", 24);
