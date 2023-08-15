define(function (require, exports, module) {
  // 同步引入
  let module2 = require("./module2")
  module2()
  // 异步引入
  require.async("./module3", function(module3) {
    module3.module3.three()
  })

  function four() {
    console.log("这是module 4")
  }
  exports.module4 = {four}
})