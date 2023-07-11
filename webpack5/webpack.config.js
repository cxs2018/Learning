const { resolve } = require("path");
module.exports = {
  mode: "development",
  entry: "./src/index.js", // 入口
  output: {
    path: resolve(__dirname, "dist"), // 输出文件夹的绝对路径
    filename: "main.js", // 输出的文件名
  },
  module: {
    rules: [{ test: /\.txt$/, use: "raw-loader" }],
  },
};
