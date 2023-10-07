const {
  Tapable,
  AsyncSeriesHook,
  SyncBailHook,
  AsyncParallelHook,
  SyncHook,
} = require("tapable");

const NormalModuleFactory = require("./NormalModuleFactory");
const Compilation = require("./Compilation");
const Stats = require("./Stats");
const { mkdirp } = require("mkdirp");
const path = require("path");

class Compiler extends Tapable {
  constructor(context) {
    super();
    this.context = context;
    this.hooks = {
      entryOption: new SyncBailHook(["context", "entry"]),
      beforeRun: new AsyncSeriesHook(["compiler"]), // 运行前
      run: new AsyncSeriesHook(["compiler"]), // 运行
      beforeCompile: new AsyncSeriesHook(["params"]), // 编译前
      compile: new SyncHook(["params"]), // 编译
      make: new AsyncParallelHook(["compilation"]), // make构建
      thisCompilation: new SyncHook(["compilation", "params"]), // 开始一次新的编译
      compilation: new SyncHook(["compilation", "params"]), // 创建完成一个新的compilation
      afterCompile: new AsyncSeriesHook(["compilation"]), // 编译完成
      emit: new AsyncSeriesHook(["compilation"]), // 要写入文件了
      done: new AsyncSeriesHook(["stats"]), // 所有的编译都完成了
    };
  }

  run(callback) {
    console.log("Compiler run", this.context);
    const onCompiled = (err, compilation) => {
      this.emitAssets(compilation, () => {
        let stats = new Stats(compilation);
        this.hooks.done.callAsync(stats, (err) => {
          callback(err, stats);
        });
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
      // 创建一个新的compilation对象
      const compilation = this.newCompilation(params);
      // 触发make钩子的回调函数执行
      this.hooks.make.callAsync(compilation, (err) => {
        console.log("make done");
        // 该 seal 封装了
        compilation.seal((err) => {
          this.hooks.afterCompile.callAsync(compilation, (err) => {
            onCompiled(err, compilation);
          });
        });
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

  emitAssets(compilation, callback) {
    console.log("onCompiled");
    // 把chunk变成文件，写入硬盘
    const emitFile = (err, params2) => {
      console.log("emitFile", err, params2);
      const assets = compilation.assets;
      let outputPath = this.options.output.path;
      for (const file in assets) {
        let source = assets[file];
        let targetPath = path.posix.join(outputPath, file);
        this.outputFileSystem.writeFileSync(targetPath, source, "utf8");
      }
      callback();
    };
    this.hooks.emit.callAsync(compilation, () => {
      // 先创建输出目录dist，再写入硬盘
      console.log("mkdirp", this.options.output.path, compilation.assets);
      mkdirp(this.options.output.path).then(emitFile);
    });
    // finalCallback(err, compilation);
  }
}

module.exports = Compiler;
