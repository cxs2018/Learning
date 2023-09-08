class Tapable1 { }

const { Tapable = Tapable1, AsyncSeriesHook, SyncBailHook } = require("tapable")

class Compiler extends Tapable {
  constructor(context) {
    super()
    this.context = context
    this.hooks = {
      done: new AsyncSeriesHook(["stats"]), // 当编译完成后触发这个钩子执行
      entryOptions: new SyncBailHook(["context", "entry"])
    }
  }

  run(calllback) {
    console.log("Compiler run", this.context)
    calllback(null, {
      toJson() {
        return {
          entrypoints: [],// 入口
          chunks: [], // 代码块
          modules: [], // 模块
          assets: [] // 资源
        }

      }
    })
  }
}

module.exports = Compiler