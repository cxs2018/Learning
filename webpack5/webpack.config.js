const { resolve, join } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "development",
  entry: "./src/index.js", // 入口
  output: {
    path: resolve(__dirname, "dist"), // 输出文件夹的绝对路径
    filename: "main.js", // 输出的文件名
  },
  devtool: 'source-map',
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
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react"
            ]
          }
        }
      ]
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: 'body'
    })
  ]
};
