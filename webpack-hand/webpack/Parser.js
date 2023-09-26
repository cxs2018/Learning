const babylon = require("babylon");
const { Tapable } = require("tapable");
class Parser extends Tapable {
  parse(source) {
    console.log("source", source);
    return babylon.parse(source, {
      sourceType: "module", // 源代码是个模块
      plugins: ["dynamicImport"], // 额外的一个插件，支持动态导入 import("./xx.js")
    });
  }
}

module.exports = Parser;
