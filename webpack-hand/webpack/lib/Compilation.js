let { Tapable, SyncHook } = require("tapable");
const NormalModuleFactory = require("./NormalModuleFactory");
const Parser = require("../Parser");
const parser = new Parser();
const path = require("path");

const normalModuleFactory = new NormalModuleFactory();
const async = require("neo-async");

class Compilation extends Tapable {
  constructor(compiler) {
    super();
    this.compiler = compiler;
    this.options = compiler.options;
    this.context = compiler.context;
    this.inputFileSystem = compiler.inputFileSystem;
    this.outputFileSystem = compiler.outputFileSystem;
    this.entries = []; // 入口数组，这里放着所有的入口模块
    this.modules = []; // 模块的数组，这里放着所有的模块
    this._modules = {}; // key 是模块id，值是模块对象
    this.hooks = {
      // 当成功构建完成一个模块后，就会触发此钩子执行
      succeedModule: new SyncHook(["module"]),
    };
  }

  /**
   * 开始编译一个新的入口
   * @param context 根目录
   * @param entry 入口模块的相对路径 ./src/index.js
   * @param name 入口的名字 main
   * @param finalCallback 编译完成的回调
   */
  addEntry(context, entry, name, finalCallback) {
    this._addModuleChain(context, entry, name, (err, module) => {
      finalCallback(err, module);
    });
  }

  _addModuleChain(context, rawRequest, name, callback) {
    this.createModule(
      {
        name,
        context,
        rawRequest,
        parser,
        resource: path.posix.join(context, rawRequest),
      },
      (entryModule) => {
        this.entries.push(entryModule);
      },
      callback,
    );
  }

  /**
   * 编译模块
   * @param module 要编译的模块
   * @param afterBuild 编译完成后的回调
   */
  buildModule(module, afterBuild) {
    // 模块真正编译其实是放在module内部完成的
    module.build(this, (err) => {
      // 一个模块编译完成了
      this.hooks.succeedModule.call(module);
      afterBuild(err, module);
    });
  }

  /**
   * 处理编译模块依赖
   * @param module ./src/index.js
   * @param callback
   */
  processModuleDependencies(module, callback) {
    // 获取当前模块的依赖模块
    let dependencies = module.dependencies;
    async.forEach(
      dependencies,
      (dependency, done) => {
        let { name, context, rawRequest, resource, moduleId } = dependency;
        this.createModule(
          {
            name,
            context,
            rawRequest,
            parser,
            resource,
            moduleId,
          },
          null,
          done,
        );
      },
      callback,
    );
  }

  /**
   * 创建并编译一个模块
   * @param data 要编译的模块信息
   * @param addEntry 可选的增加入口的方法
   * @param callback 编译完成后可以调用callback
   */
  createModule(data, addEntry, callback) {
    // 先通过模块工厂创建一个模块
    let module = normalModuleFactory.create(data);
    console.log("this.context", this.context);
    module.moduleId = "./" + path.posix.relative(this.context, module.resource); // ./src/index.js
    if (addEntry) {
      // 如果这个模块是入口模块，就把它放到 entries 里面去
      addEntry(module);
    }
    this.modules.push(module);
    this._modules[module.moduleId] = module;
    const afterBuild = (err, module) => {
      if (module.dependencies.length > 0) {
        this.processModuleDependencies(module, (err) => {
          callback(err, module);
        });
      } else {
        callback(err, module);
      }
    };
    this.buildModule(module, afterBuild);
  }
}

module.exports = Compilation;
