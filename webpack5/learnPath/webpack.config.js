const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./learnPath/index.js", // 入口
  output: {
    path: resolve(__dirname, "dist"), // 输出文件夹的绝对路径
    filename: "main.js", // 输出的文件名
    publicPath: "/"
  },
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
      directory: join(__dirname, "static"),
      publicPath: "/assets/"
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './learnPath/index.html',
      inject: 'body'
    })
  ]
}