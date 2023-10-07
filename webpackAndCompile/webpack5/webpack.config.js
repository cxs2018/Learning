const { resolve, join, basename } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const fs = require("fs");
const webpack = require("webpack");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const FileManagerWebpackPluggin = require("filemanager-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

// 编译时使用的全局变量，先设置，这里就可以用了
const environmentation = process.env.NODE_ENV; // dev ? pro
console.log("build params", environmentation);
// let lodashCDN = environmentation == 'development' ? "./lodash.js" : "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js"

const pagesRoot = resolve(__dirname, 'src', 'pages')
const pages = fs.readdirSync(pagesRoot)
let htmlWebpackPlugins = [];
const entry = pages.reduce((entry, fileName) => {
  let entryName = basename(fileName, '.js')
  entry[entryName] = join(pagesRoot, fileName)
  htmlWebpackPlugins.push(
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: `${entryName}.html`,
      chunks: [entryName],
      inject: "body",
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  )
  return entry
}, {})

module.exports = (env) => {
  console.log(
    "env",
    env,
    environmentation,
    typeof environmentation,
    environmentation == "development"
  );
  let lodashCDN =
    environmentation == "development"
      ? "./lodash.js"
      : "https://cdn.bootcdn.net/ajax/libs/lodash.js/4.17.21/lodash.js";
  return {
    mode: env.production ? 'production' : 'development',
    entry, // 入口
    output: {
      path: resolve(__dirname, "dist"), // 输出文件夹的绝对路径
      filename: "[name].[hash:10].js", // 输出的文件名
      // publicPath: "/", // build 写 ./，serve写 /  or 都不写
      chunkFilename: "[name].[hash:5].js"
    },
    optimization: {
      minimize: env && env.production, // 是否开启压缩
      minimizer: env && env.production ? [
        // 压缩js
        new TerserPlugin()
      ] : []
    },
    devtool: false,
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
      // proxy: {
      //   "/api": {
      //     target: "http://localhost:3000",
      //     pathRewrite: {
      //       "^/api": "",
      //     },
      //   },
      // },
      onBeforeSetupMiddleware: function (devServer) {
        if (!devServer) {
          throw new Error("webpack-dev-server is not defined");
        }

        devServer.app.get("/api/users", (req, res) => {
          res.json([{ id: 1, name: "hello world" }]);
        });
      },
      // setupMiddlewares: (middlewares, devServer) => {
      //   if (!devServer) {
      //     throw new Error("webpack-dev-server is not defined");
      //   }

      //   devServer.app.get("/api/getUserInfo", (_, response) => {
      //     response.send("setup-middlewares option GET");
      //   });

      //   // 如果你想在所有其他中间件之前运行一个中间件或者当你从 `onBeforeSetupMiddleware` 配置项迁移时，
      //   // 可以使用 `unshift` 方法
      //   middlewares.unshift({
      //     name: "first-in-array",
      //     // `path` 是可选的
      //     path: "/api/getUserInfo",
      //     middleware: (req, res) => {
      //       res.send("Foo!");
      //     },
      //   });

      //   // 如果你想在所有其他中间件之后运行一个中间件或者当你从 `onAfterSetupMiddleware` 配置项迁移时，
      //   // 可以使用 `push` 方法
      //   middlewares.push({
      //     name: "hello-world-test-one",
      //     // `path` 是可选的
      //     path: "/api/getUserInfo",
      //     middleware: (req, res) => {
      //       res.send("Foo Bar!");
      //     },
      //   });

      //   middlewares.push((_, res) => {
      //     res.send("hello world");
      //   });

      //   return middlewares;
      // },
    },
    module: {
      rules: [
        { test: /\.txt$/, use: "raw-loader" },
        {
          test: /\.css$/, use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", {
            loader: "px2rem-loader",
            options: {
              remUnit: 75
            }
          }]
        },
        {
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"],
        },
        {
          test: /\.scss$/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
        },
        {
          test: /\.png$/,
          use: [
            {
              loader: "file-loader",
              options: {
                // name: "images/[hash:10].[ext]",
                name: "[hash:10].[ext]",
                esModule: false,
                // limit: 20 * 1024, // 大于这个的图片，会拷贝，像 file-loader 一样
                outputPath: "images",
                publicPath: "./images"
                // / 相当于根目录，不加 / 或 ./ 相对于当前文件，如相当于当前引入图片的 css 文件的相对路径
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: ["html-loader"]
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  // "@babel/preset-env", // 预设是插件的集合
                  "@babel/preset-react",
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
                plugins: [
                  // [
                  //   "@babel/plugin-transform-runtime",
                  //   {
                  //     corejs: 3,
                  //     helpers: true,
                  //     regenerator: true,
                  //   },
                  // ],
                  ["@babel/plugin-proposal-decorators", { legacy: true }],
                  // ["@babel/plugin-proposal-class-properties", { loose: true }] // 已包含在 "@babel/preset-env" 中，不用再单独引入了 https://babeljs.io/docs/babel-plugin-transform-class-properties
                ],
              },
            },
          ],
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
    plugins: (htmlWebpackPlugins.concat([
      // new webpack.ProvidePlugin({
      //   _: 'lodash'
      // })
      new HtmlWebpackExternalsPlugin({
        externals: [
          {
            module: "lodash",
            entry: lodashCDN, // 可以用本地路径，只用能访问到就行 如 ./lodash.js（位于静态目录 static 中）、lodash.js
            global: "_",
          },
        ],
      }),
      new webpack.DefinePlugin({
        DEVELOPMENT: environmentation === "development",
        EXPRESSION: "1+2", // 会计算表达式的值 eval执行
      }),
      // 可代替 devtools
      // new webpack.SourceMapDevToolPlugin({
      //   filename: "[file].map", // main.js -> main.js.map
      //   append: "\n//# sourceMappingURL=http://localhost:8081/[url]", // sourcemap地址，浏览器会读取这个地址，显示代码源文件
      // }),
      // new FileManagerWebpackPluggin({
      //   events: {
      //     onEnd: {
      //       copy: [
      //         {
      //           source: "./dist/*.map",
      //           destination:
      //             "D:/importantfiles/frontEndLearing/Learning/webpack5/sourcemap",
      //         },
      //       ],
      //       delete: ["./dist/*.map"],
      //     },
      //   },
      // }),
      // new CopyPlugin({
      //   patterns: [
      //     {
      //       from: resolve(__dirname, "src/documents"),
      //       to: resolve(__dirname, "dist/documents"),
      //     },
      //   ],
      // }),
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: ["**/*"],
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      // 压缩css
      env && env.production && new OptimizeCssAssetsPlugin()
    ])).filter(Boolean),
    // 如果已经通过cdn外链引入的方式引入了一个lodash库了，并且已经挂载到 _ 上了, key 是js里面引的三方库，value 是window上挂的值，直接 window._ = require("lodash")
    externals: {
      // lodash: '_'
    },
    watch: false, // 监听文件变化，自动重新打包
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000,
    },
  };
};
