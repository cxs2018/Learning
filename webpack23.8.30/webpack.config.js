const path = require("path")
// const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  // webpack寻找相对路径的文件时会以context为目录，默认为执行启动webpack时所在的当前工作目录
  context: path.resolve(__dirname, ''),
  // JS 执行入口文件
  // entry: "./src/main.js",
  entry: './learnImgBuild/index.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: "bundle.js",
    // 输出文件都放到 dist 目录下
    path: path.resolve(__dirname, "./dist2")
  },
  mode: "development",
  // loader 处理非JS文件，如css、图片等资源
  module: {
    rules: [
      {
        // 用正则去匹配要用该loader转换的css文件
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
        // use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(jpg|png|gif)$/,
        type: "asset",
        //解析
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          }
        },
        generator: {
          //与output.assetModuleFilename是相同的,这个写法引入的时候也会添加好这个路径
          filename: 'img/[name].[hash:6][ext]',
          //打包后对资源的引入，文件命名已经有/img了
          publicPath: './'
        },
      },
      {
        test: /\.html$/,
        use: "html-loader"
      }
    ]
  },
  // plugins: [
  //   new MiniCssExtractPlugin({
  //     // 从 .js 文件提取出来的 .css 文件的名称
  //     filename: `[name]_[contenthash:8].css`
  //   })
  // ]
  plugins: [
    new HtmlWebpackPlugin({
      template: './learnImgBuild/index.html',
      inject: 'body'
    })
  ]
}