const babel = require("@babel/core");

function loader(source) {
  let options = {
    presets: ["@babel/preset-env"], // 预设
    sourceMap: true,
    filename: this.request.split("/").pop(),
  };
  let { code, map, ast } = babel.transform(source, options);
  // 在loader执行会指向loader context对象
  return this.callback(null, code, map, ast);
}

module.exports = loader;
