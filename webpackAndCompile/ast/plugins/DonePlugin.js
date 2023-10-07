class DonePlugin {
  apply(compiler) {
    // 注册 done 同步钩子
    compiler.hooks.done.tap("DonePlugin", () => {
      console.log("tap DonePlugin");
    });
    compiler.hooks.done.tapAsync("DonePlugin", (stats, callback) => {
      console.log("tap DonePlugin async");
      callback();
    });
  }
}

module.exports = DonePlugin;
