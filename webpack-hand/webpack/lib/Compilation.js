let { Tapable, SyncHook } = require("tapable");
const NormalModuleFactory = require("./NormalModuleFactory");
const Parser = require("./Parser");
const parser = new Parser();
const path = require("path");

const normalModuleFactory = new NormalModuleFactory();
const async = require("neo-async");
const Chunk = require("./Chunk");
const ejs = require("ejs");
const fs = require("fs");
// const mainTemplate = fs.readFileSync(
//   path.join(__dirname, "templates", "main.ejs"),
//   "utf8",
// );
const mainTemplate = fs.readFileSync(
  path.join(__dirname, "templates", "deferMain.ejs"),
  "utf8",
);
const mainRender = ejs.compile(mainTemplate);
const chunkTemplate = fs.readFileSync(
  path.join(__dirname, "templates", "chunk.ejs"),
  "utf8",
);
const chunkRender = ejs.compile(chunkTemplate);

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
    this.chunks = []; //这里放着所有的代码块
    this.files = []; //这里放着本次编译所有的文件名
    this.assets = {}; // 存放着生成的资源，key 是文件名，value是文件内容
    this.vendors = []; // 三方库模块
    this.commons = []; // 本地公共模块
    this.moduleCount = {}; // 记录每个模块被代码块引用的次数
    this.hooks = {
      // 当成功构建完成一个模块后，就会触发此钩子执行
      succeedModule: new SyncHook(["module"]),
      seal: new SyncHook(),
      beforeChunks: new SyncHook(),
      afterChunks: new SyncHook(),
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
    this._addModuleChain(context, entry, name, false, (err, module) => {
      finalCallback(err, module);
    });
  }

  _addModuleChain(context, rawRequest, name, async, callback) {
    this.createModule(
      {
        name,
        context,
        rawRequest,
        parser,
        resource: path.posix.join(context, rawRequest),
        moduleId:
          "./" +
          path.posix.relative(context, path.posix.join(context, rawRequest)),
        async,
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

  /**
   * 把模块封装成代码块 chunk
   * @param callback
   */
  seal(callback) {
    this.hooks.seal.call();
    this.hooks.beforeChunks.call();
    // 循环所有的modules数组
    for (const module of this.modules) {
      // 三方模块
      if (/node_modules/.test(module.moduleId)) {
        module.name = "vendors";
        // 可能三方库在不同代码块里都引了，去下重
        if (
          !this.vendors
            .map((vendor) => vendor.moduleId)
            .includes(module.moduleId)
        ) {
          this.vendors.push(module);
        }
      } else {
        let count = this.moduleCount[module.moduleId];
        if (count) {
          this.moduleCount[module.moduleId].count++;
        } else {
          this.moduleCount[module.moduleId] = { module, count: 1 };
        }
      }
    }
    for (const moduleId in this.moduleCount) {
      const { module, count } = this.moduleCount[moduleId];
      if (count >= 2) {
        module.name = "commons";
        this.commons.push(module);
      }
    }
    let deferredModules = [...this.vendors, ...this.commons].map(
      (module) => module.moduleId,
    );
    this.modules = this.modules.filter(
      (module) => !deferredModules.includes(module.moduleId),
    );
    // 一般情况下，一个入口生成一个代码块
    for (const entryModule of this.entries) {
      const chunk = new Chunk(entryModule); // 先根据入口模块得到一个代码块
      this.chunks.push(chunk);
      // 对所有模块进行过滤，找出来那些名称跟这个chunk一样的模块，组成一个数组赋给chunk.modules
      chunk.modules = this.modules.filter(
        (module) => module.name === chunk.name,
      );
    }
    if (this.vendors.length > 0) {
      const chunk = new Chunk(this.vendors[0]); // 先根据入口模块得到一个代码块
      chunk.async = true;
      this.chunks.push(chunk);
      chunk.modules = this.vendors;
    }
    if (this.commons.length > 0) {
      const chunk = new Chunk(this.commons[0]); // 先根据入口模块得到一个代码块
      chunk.async = true;
      this.chunks.push(chunk);
      chunk.modules = this.commons;
    }
    this.hooks.afterChunks.call(this.chunks);
    // 生成代码块之后，要生成代码块对应资源
    this.createChunkAssets();
    callback();
  }

  createChunkAssets() {
    for (let i = 0; i < this.chunks.length; i++) {
      const chunk = this.chunks[i];
      const file = chunk.name + ".js";
      chunk.files.push(file);
      let source;
      if (chunk.async) {
        source = chunkRender({
          chunkName: chunk.name,
          modules: chunk.modules, // 此代码块对应的模块数组
        });
      } else {
        const deferredChunks = [];
        if (this.vendors.length > 0) {
          deferredChunks.push("vendors");
        }
        if (this.commons.length > 0) {
          deferredChunks.push("commons");
        }
        source = mainRender({
          entryModuleId: chunk.entryModule.moduleId, // ./src/index.js,
          deferredChunks,
          modules: chunk.modules, // 此代码块对应的模块数组
        });
      }
      this.emitAssets(file, source);
    }
  }

  emitAssets(file, source) {
    this.assets[file] = source;
    this.files.push(file);
  }
}

module.exports = Compilation;
