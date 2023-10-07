const path = require("path")
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: 'development',
  entry: {
    main: {
      import: "./src/index.js",
      // dependOn: "shared"
    },
    // another: {
    //   import: "./src/another-module.js",
    // dependOn: "shared"
    // },
    // shared: "lodash"
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.css$/i,
  //       use: ["style-loader", "css-loader"]
  //     },
  //     {
  //       test: /\.(png|svg|jpg|jpeg|gif)$/i,
  //       type: "asset/resource"
  //     },
  //     {
  //       test: /\.(woff|woff2|eot|ttf|otf)$/i,
  //       type: 'asset/resource',
  //     },
  //     {
  //       test: /\.(csv|tsv)$/i,
  //       use: ['csv-loader'],
  //     },
  //     {
  //       test: /\.xml$/i,
  //       use: ['xml-loader'],
  //     },
  //     {
  //       test: /\.toml$/i,
  //       type: 'json',
  //       parser: {
  //         parse: toml.parse,
  //       },
  //     },
  //     {
  //       test: /\.yaml$/i,
  //       type: 'json',
  //       parser: {
  //         parse: yaml.parse,
  //       },
  //     },
  //     {
  //       test: /\.json5$/i,
  //       type: 'json',
  //       parser: {
  //         parse: json5.parse,
  //       },
  //     },
  //   ]
  // },
  optimization: {
    moduleIds: 'deterministic',
    runtimeChunk: 'single', // 将 runtime 代码拆分为一个单独的chunk，设置为 single 为所有chunk创建一个 runtime bundle
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all"
        }
      },
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "caching"
    })
  ]
}