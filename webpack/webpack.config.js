// webpack是node写的 node的写法
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");
let optimizeCss = require("optimize-css-assets-webpack-plugin"); // TODO not work
let UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // TODO not work

module.exports = {
  optimization: {
    // 优化项
    minimizer: [
      new optimizeCss(),
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  devServer: {
    // 开发服务器的配置
    port: 3000,
    progress: true,
    contentBase: "./build",
    open: true,
  },
  mode: "development", // 模式，默认两种 production、development
  entry: "./src/index.js",
  output: {
    filename: "bundle.[hash:8].js", // 打包后的文件名
    path: path.resolve(__dirname, "build"), // 路径必须是一个绝对路径
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      minify: {
        // removeAttributeQuotes: true, //去掉双引号
        // collapseWhitespace: true, // 折叠空白
      },
      hash: true,
    }),
    new MiniCssExtractPlugin({
      filename: "main.css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: "style-loader",
          //   options: {
          //     insertAt: "top",
          //   },
          // },
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.less$/, // 可以处理less文件 sass stylus node-sass sass-loader stylus stylus-loader
        use: [
          // {
          //   loader: "style-loader",
          //   options: {
          //     insertAt: "top",
          //   },
          // },
          MiniCssExtractPlugin.loader,
          "css-loader", // @import语法 解析路径
          "postcss-loader", // 加浏览器前缀 兼容
          "less-loader", // less -> css
        ],
      },
    ],
  },
};
