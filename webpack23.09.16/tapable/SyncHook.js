const Hook = require("./Hook");
const SyncHookCodeFactory = require("./SyncHookCodeFactory");
const factory = new SyncHookCodeFactory();

class SyncHook extends Hook {
  compile(options) {
    factory.setup(this, options);
    return factory.create(options);
  }
}

module.exports = SyncHook;
