const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const FileManagerWepackPlugin = require("filemanager-webpack-plugin")
// const babelLoader = path.join(__dirname, "realize/loaders/babel-loader.js");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  // devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  // resolveLoader: {
  //   modules: ["node_modules", path.join(__dirname, "realize/loaders")],
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    // 有了 babel-plugin-transform-runtime 不需要这里了，自动引入对应的方法，如promise，也不不会污染全局变量
                    useBuiltIns: "usage", // 按需加载 polyfill
                    corejs: {
                      version: 3,
                    },
                    targets: {
                      chrome: "60",
                      firefox: "60",
                      ie: "9",
                      safari: "10",
                      edge: "17",
                    },
                    loose: true,
                  },
                ],
              ],
            }
          }
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
    new webpack.SourceMapDevToolPlugin({
      append: "//# sourcemapMappingURL=http:127.0.0.1:5500/sourcemap/[url]",
      filename: "[file].map"
    }),
    new FileManagerWepackPlugin({
      events: {
        onEnd: {
          copy: [
            {
              source: "./dist/**/*.map",
              destination: path.resolve(__dirname, "sourcemap")
            }
          ],
          delete: ["./dist/**/*.map"],
          archive: [
            {
              source: "./dist",
              destination: "./archive/project.zip" // 要先建立 archive 文件夹
            }
          ]
        }
      }
    })
  ],
};
