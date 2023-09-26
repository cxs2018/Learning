const Compiler = require("./Compiler");
const NodeEnvironmentPlugin = require("./node/NodeEnvironmoentPlugin");
const WebpackOptionsApply = require("./WebpackOptionsApply");

const webpack = function (options) {
  // 1. 验证配置文件是否合法，如果不合法，报错
  // 2. 增加默认参数
  // 创建一个 Compiler 实例
  let compiler = new Compiler(options.context);
  compiler.options = options;
  // 让 compiler 可以读写文件
  new NodeEnvironmentPlugin().apply(compiler);
  // 挂载配置文件里提供的所有 plugins
  if (options.plugins && Array.isArray(options.plugins)) {
    for (const plugin of options.plugins) {
      // 挂载每个插件到 compiler
      plugin.apply(compiler);
    }
  }

  // 初始化选项（挂载内置插件）
  new WebpackOptionsApply().process(options, compiler);
  return compiler;
};

exports = module.exports = webpack;
