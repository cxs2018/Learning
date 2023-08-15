define(function(require, exports, module) {
  let module1 = require("./module1")
  module1.one()

  let module4 = require("./module4")
  module4.module4.four()
})