define(function (require, exports, module) {
  function one() {
    console.log("这是module 1")
  }
  module.exports = {one}
})