class Tapable1 {}

const {
  Tapable = Tapable1,
  AsyncSeriesHook,
  SyncBailHook,
  AsyncParallelHook,
  SyncHook,
} = require("tapable");

const NormalModuleFactory = require("./NormalModuleFactory");
const Compilation = require("./Compilation");

class Compiler extends Tapable {
  constructor(context) {
    super();
    this.context = context;
    this.hooks = {
      done: new AsyncSeriesHook(["stats"]), // 当编译完成后触发这个钩子执行
      entryOption: new SyncBailHook(["context", "entry"]),
      beforeRun: new AsyncSeriesHook(["compiler"]), // 运行前
      run: new AsyncSeriesHook(["compiler"]), // 运行
      beforeCompile: new AsyncSeriesHook(["params"]), // 编译前
      compile: new SyncHook(["params"]), // 编译
      make: new AsyncParallelHook("compilation"), // make构建
      thisCompilation: new SyncHook(["compilation", "params"]), // 开始一次新的编译
      compilation: new SyncHook(["compilation", "params"]), // 创建完成一个新的compilation
      afterCompile: new AsyncSeriesHook(["compilation"]), // 编译完成
    };
  }

  run(callback) {
    console.log("Compiler run", this.context);
    // 最终回调
    const finalCallback = (err, stats) => {
      callback(err, stats);
    };
    const onCompiled = (err, compilation) => {
      console.log("onCompiled");
      finalCallback(err, {
        entrypoints: [], // 入口
        chunks: [], // 代码块
        modules: [], // 模块
        assets: [], // 资源
      });
    };
    this.hooks.beforeRun.callAsync(this, (err) => {
      this.hooks.run.callAsync(this, (err) => {
        this.compile(onCompiled);
      });
    });
  }

  compile(onCompiled) {
    const params = this.newCompilationParams();
    this.hooks.beforeCompile.callAsync(params, (err) => {
      this.hooks.compile.call(params);
      debugger;
      const compilation = this.newCompilation(params);
      this.hooks.make.callAsync(compilation, (err) => {
        console.log("make done");
        onCompiled();
      });
    });
  }

  newCompilationParams() {
    const params = {
      normalModuleFactory: new NormalModuleFactory(),
    };
    return params;
  }

  newCompilation(params) {
    const compilation = this.createCompilation();
    this.hooks.thisCompilation.call(compilation, params);
    this.hooks.compilation.call(compilation, params);
    return compilation;
  }

  createCompilation() {
    return new Compilation(this);
  }
}

module.exports = Compiler;
