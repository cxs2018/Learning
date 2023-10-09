/**
 * 手写实现main.js模版代码
 */
(function (modules) {
  function require(moduleId) {
    let module = {
      i: moduleId,
      l: false,
      exports: {},
    };
    modules[moduleId].call(module.exports, module, module.exports, require);
    module.l = true;
    return module.exports;
  }
  return require("./src/index.js");
})({
  "./src/index.js": function (module, exports, require) {
    var title = require("./src/title.js");
    console.log(title);
  },
  "./src/title.js": function (module, exports) {
    module.exports = "title";
  },
});
