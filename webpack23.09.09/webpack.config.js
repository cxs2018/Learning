const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const FileManagerWepackPlugin = require("filemanager-webpack-plugin");
// const babelLoader = path.join(__dirname, "realize/loaders/babel-loader.js");

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    clean: true,
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
            },
          },
        ],
      },
      // {
      //   test: /\.(jpg|png|gif|bmp)$/,
      //   use: [
      //     {
      //       loader: "file-loader-my",
      //       options: {
      //         filename: "[hash].[ext]",
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(jpg|png|gif|bmp)$/,
        use: [
          {
            loader: "url-loader-my",
            options: {
              limit: 20 * 1024,
              filename: "[hash].[ext]",
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          "style-loader-my-2", // 把样式文本变成一个style标签插入到页面中
          // "css-loader-my",
          "less-loader-my", // 把less编译成css
        ],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader-my-2", // 把样式文本变成一个style标签插入到页面中
          "css-loader-my",
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
    // new webpack.SourceMapDevToolPlugin({
    //   append: "//# sourcemapMappingURL=http:127.0.0.1:5500/sourcemap/[url]",
    //   filename: "[file].map"
    // }),
    // new FileManagerWepackPlugin({
    //   events: {
    //     onEnd: {
    //       copy: [
    //         {
    //           source: "./dist/**/*.map",
    //           destination: path.resolve(__dirname, "sourcemap")
    //         }
    //       ],
    //       delete: ["./dist/**/*.map"],
    //       archive: [
    //         {
    //           source: "./dist",
    //           destination: "./archive/project.zip" // 要先建立 archive 文件夹
    //         }
    //       ]
    //     }
    //   }
    // })
  ],
};
