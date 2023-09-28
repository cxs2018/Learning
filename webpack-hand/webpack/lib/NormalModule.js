const path = require("path");
const types = require("babel-types");
const generator = require("babel-generator");
const traverse = require("babel-traverse");
const async = require("neo-async");

class NormalModule {
  constructor({
    name,
    context,
    rawRequest,
    resource,
    parser,
    moduleId,
    async,
  }) {
    this.name = name;
    this.context = context;
    this.rawRequest = rawRequest;
    this.resource = resource;
    this.parser = parser; // ast解析器，可以把源代码转换成ast
    this._source; // 源代码
    this._ast; // ast
    this.dependencies = []; // 当前模块依赖的模块信息
    this.moduleId = moduleId;
    this.blocks = []; // 当前模块依赖哪些异步模块 import()
    this.async = async; // 表示当前的模块是异步代码块，还是同步代码块
  }

  /**
   * 编译本模块
   * @param compilation
   * @param callback
   */
  build(compilation, callback) {
    /**
     * 1. 先从硬盘上把模块内容读出来，读出一个文件
     * 2. 可能它不是一个js模块，要走loader的转换，最终肯定要得到一个js模块，如果得不到就报错了
     * 3. 把js模块代码（字符串形式）经过parser处理转成ast
     * 4. 分析ast里面的依赖，找到import节点、require节点，分析依赖的模块
     * 5. 递归地编译依赖的模块
     * 6. 不停的依次递归执行上面5步，直到所有的模块都编译完成为止
     */
    this.doBuild(compilation, (err) => {
      this._ast = this.parser.parse(this._source);
      // 版本问题
      traverse.default(this._ast, {
        CallExpression: (nodePath) => {
          let node = nodePath.node; // 获取节点
          if (node.callee.name === "require") {
            node.callee.name = "__webpack_require__";
            // 如果方法名是require方法的话
            let moduleName = node.arguments[0].value; // 模块的名称
            // 扩展名
            let extName =
              moduleName.split(path.posix.sep).pop().indexOf(".") == -1
                ? ".js"
                : "";
            console.log(
              "moduleName",
              moduleName,
              extName,
              this.context,
              this.resource,
            );
            let depResource = path.posix.join(
              path.posix.dirname(this.resource),
              moduleName + extName,
            );
            // 获取模块ID，./src/title.js
            let depModuleId =
              "./" + path.posix.relative(this.context, depResource);
            console.log(
              "depModuleId",
              depModuleId,
              types.stringLiteral(depModuleId),
            );
            // 把 require 的参数从 ./title.js -> ./src/index.js
            node.arguments = [types.stringLiteral(depModuleId)];
            this.dependencies.push({
              name: this.name,
              context: this.context,
              rawRequest: moduleName, // 原始路径
              moduleId: depModuleId, // 模块ID
              resource: depResource, // 依赖模块的绝对路径
            });
          } else if (types.isImport(node.callee)) {
            /**
             * 如果遇到了import，那么import的模块会成为一个单独的入口，会生成一个单独的代码块，会生成一个单独的文件
             */
            // 1. 模块的名称
            let moduleName = node.arguments[0].value;
            // 2. 扩展名
            let extName =
              moduleName.split(path.posix.sep).pop().indexOf(".") == -1
                ? ".js"
                : "";
            // 3. 绝对路径
            let depResource = path.posix.join(
              path.posix.dirname(this.resource),
              moduleName + extName,
            );
            // 4. 相对根目录的相对路径
            let depModuleId =
              "./" + path.posix.relative(this.context, depResource);
            // 5. 匹配魔法注释提取异步代码块名字 /* webpackChunkName: 'title' */ 默认是 0, 会递增
            let chunkName = "0";
            if (
              Array.isArray(node.arguments[0].leadingComments) &&
              node.arguments[0].leadingComments.length > 0
            ) {
              const leadingComments =
                node.arguments[0].leadingComments[0].value;
              const regexp = /webpackChunkName:\s*['"]([^'"]+)['"]\s*/;
              chunkName = leadingComments.match(regexp)[1]; // title
            }
            nodePath.replaceWithSourceString(
              `__webpack_require__.e("${chunkName}").then(__webpack_require__.t.bind(null,"${depModuleId}", 7))`,
            );
            this.blocks.push({
              name: chunkName, // 代码块的名字
              context: this.context,
              entry: depModuleId,
              // rawRequest: moduleName, // 原始路径
              // resource: depResource, // 依赖模块的绝对路径
              async: true, // 异步代码块
            });
          }
        },
      });
      let { code } = generator.default(this._ast);
      this._source = code;
      console.log("this._source", code, this.blocks);
      // 依赖的异步代码块构建完成，自己才算构建完成
      async.forEach(
        this.blocks,
        (block, done) => {
          const { context, entry, name, async } = block;
          compilation._addModuleChain(context, entry, name, async, done);
        },
        callback,
      );
    });
  }

  /**
   * 1. 读取源代码
   * @param compilation
   * @param callback
   */
  doBuild(compilation, callback) {
    this.getSource(compilation, (err, source) => {
      // 把最原始的代码存放到当前模块的 _source 属性上
      this._source = source;
      callback();
    });
  }

  /**
   * 读取真正的源代码
   * @param compilation
   */
  getSource(compilation, callback) {
    compilation.inputFileSystem.readFile(this.resource, "utf8", callback);
  }
}

module.exports = NormalModule;
