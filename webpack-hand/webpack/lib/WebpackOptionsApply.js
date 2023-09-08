/**
 * 挂载各种内置插件
 */
class WebpackOptionsApply {
  process(options, compiler) {
    // 注册插件
    new EntryOptionPlugin().apply(compiler);
    // 触发 entryOptions 钩子，context是根目录的路径，entry 入口 ./src/index.js
    compiler.hooks.entryOptions.call(options.context, options.entry);
  }
}

module.exports = WebpackOptionsApply