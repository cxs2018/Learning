const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.js", // 入口
  output: {
    path: resolve(__dirname, "dist"), // 输出文件夹的绝对路径
    filename: "main.js", // 输出的文件名
  },
  devtool: 'source-map',
  // devtool: false,
  devServer: {
    // contentBase: resolve(__dirname, 'dist'),
    port: 8080, // 端口
    open: true, // 自动打开浏览器
    compress: true, // 启用压缩,
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      // 额外的文件
      directory: join(__dirname, "doc"),
    },
  },
  module: {
    rules: [{ test: /\.txt$/, use: "raw-loader" }, { test: /\.css$/, use: ['style-loader', 'css-loader'] }, {
      test: /\.less$/,
      use: ["style-loader", "css-loader", "less-loader"]
    }, {
      test: /\.scss$/,
      use:
        ["style-loader", "css-loader", "sass-loader"]
    }, {
      test: /\.png$/, use: [{
        loader: 'file-loader',
        options: {
          name: "[hash:10].[ext]",
          esModule: false,
          // limit: 20 * 1024, // 大于这个的图片，会拷贝，像 file-loader 一样
        }
      }],
    }, {
      // test: /\.html$/,
      // use: ["html-loader"]
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              // "@babel/preset-env", // 预设是插件的集合
              "@babel/preset-react",
              ["@babel/preset-env", {
                useBuiltIns: 'usage', // 按需加载 polyfill
                corejs: {
                  version: 3
                },
                targets: {
                  chrome: "60",
                  firefox: "60",
                  ie: "9",
                  safari: "10",
                  edge: "17"
                }
              }]
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              // ["@babel/plugin-proposal-class-properties", { loose: true }] // 已包含在 "@babel/preset-env" 中，不用再单独引入了 https://babeljs.io/docs/babel-plugin-transform-class-properties
            ]
          }
        }
      ]
    },
      // {
      //   test: require.resolve("lodash"),
      //   loader: "expose-loader",
      //   options: {
      //     exposes: {
      //       globalName: "_",
      //       override: true,
      //     },
      //   }
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    }),
    // new webpack.ProvidePlugin({
    //   _: 'lodash'
    // })
    new HtmlWebpackExternalsPlugin({
      externals: [{
        module: "lodash",
        entry: "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js", // 可以用本地路径，只用能访问到就行 如 ./lodash.js（位于静态目录 static 中）、lodash.js
        global: "_"
      }]
    })
  ],
  // 如果已经通过cdn外链引入的方式引入了一个lodash库了，并且已经挂载到 _ 上了, key 是js里面引的三方库，value 是window上挂的值，直接 window._ = require("lodash")
  externals: {
    // lodash: '_'
  }
};
