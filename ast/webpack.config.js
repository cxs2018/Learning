const path = require("path");
const DonePlugin = require("./plugins/DonePlugin");
const AssetsPlugin = require("./plugins/AssetsPlugin");
const ZipPlugin = require("./plugins/ZipPlugin");
const AutoExternalPlugin = require("./plugins/AutoExternalPlugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
  },
  devtool: false,
  module: {
    // rules: [
    //   {
    //     test: /\.js$/,
    //     use: {
    //       loader: "babel-loader",
    //       options: {
    //         plugins: [
    //           [
    //             path.resolve(__dirname, "plugins/babel-plugin-import.js"),
    //             { library: "lodash" },
    //           ],
    //         ],
    //       },
    //     },
    //   },
    // ],
  },
  plugins: [
    // new DonePlugin(),
    // new AssetsPlugin(),
    // new ZipPlugin({ filename: "asset-custom.zip" }),
    new AutoExternalPlugin({
      jquery: {
        variable: "$",
        url: "https://code.jquery.com/jquery-3.7.1.min.js",
      },
      lodash: {
        variable: "_",
        url: "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.core.min.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
