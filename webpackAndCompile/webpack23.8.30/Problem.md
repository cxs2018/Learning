学习网址 https://webpack.wuhaolin.cn/

学习日记
23.8.30
1. extract-text-webpack-plugin 在 Webpack5 已废弃，需要使用 mini-css-extract-plugin

```js
// extract-text-webpack-plugin 已废弃
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  // JavaScript 执行入口文件
  entry: './main.js',
  output: {
    // 把所有依赖的模块合并输出到一个 bundle.js 文件
    filename: 'bundle.js',
    // 把输出文件都放到 dist 目录下
    path: path.resolve(__dirname, './dist'),
  },
  module: {
    rules: [
      {
        // 用正则去匹配要用该 loader 转换的 CSS 文件
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          // 转换 .css 文件需要使用的 Loader
          use: ['css-loader'],
        }),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      // 从 .js 文件中提取出来的 .css 文件的名称
      filename: `[name]_[contenthash:8].css`,
    }),
  ]
};

// mini-css-extract-plugin 推荐
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
module.exports = {
    entry: {
        main: "./src/main.js",
    },
    plugins:[
        new MiniCssExtractPlugin(),
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader']
            },
        ]
    }
}
```

2. css-loader minimize参数已废弃（css-loader?minimize）

3. webpack-dev-server 运行后,localhost:8080显示 Cannot get
webpack-dev-server 默认静态目录是 public，可指定静态目录 webpack-dev-server --config webpack.config.js --static src
