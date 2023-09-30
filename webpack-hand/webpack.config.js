const path = require("path");

module.exports = {
  context: process.cwd(), // 当前的工作目录
  mode: "development",
  devtool: false,
  entry: {
    page1: "./src/page1.js",
    page2: "./src/page2.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    chunkFilename: "[name].js",
  },
};
