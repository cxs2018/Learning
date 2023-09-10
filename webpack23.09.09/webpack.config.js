const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const babelLoader = path.join(__dirname, "realize/loaders/babel-loader.js");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  resolveLoader: {
    modules: ["node_modules", path.join(__dirname, "realize/loaders")],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {},
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["main"],
    }),
  ],
};
