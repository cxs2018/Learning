const path = require("path");
const DonePlugin = require("./plugins/DonePlugin");
const AssetsPlugin = require("./plugins/AssetsPlugin");
const ZipPlugin = require("./plugins/ZipPlugin");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              [
                path.resolve(__dirname, "plugins/babel-plugin-import.js"),
                { library: "lodash" },
              ],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new DonePlugin(),
    new AssetsPlugin(),
    new ZipPlugin({ filename: "asset-custom.zip" }),
  ],
};
