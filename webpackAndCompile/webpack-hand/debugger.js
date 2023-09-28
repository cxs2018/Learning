const webpack = require("./webpack/lib/webpack");
// const webpack = require("webpack");
const webpackOptions = require("./webpack.config");

const compiler = webpack(webpackOptions);
compiler.run((err, stats) => {
  console.log(err, stats.toJson());
});
