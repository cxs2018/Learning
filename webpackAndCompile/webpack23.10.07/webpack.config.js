const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: false,
  entry: {
    "commonjs-load-commonjs": "./src/commonjs-load-commonjs/index.js",
    "commonjs-load-es6": "./src/commonjs-load-es6/index.js",
    "es6-load-es6": "./src/es6-load-es6/index.js",
    "es6-load-commonjs": "./src/es6-load-commonjs/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
