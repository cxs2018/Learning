// 模块化规范：为JS提供一种模块编写、模块依赖和模块运行的方案，降低代码复杂度、提高解耦性
// 1. Script标签
// 污染全局作用域、需要解决模块和代码库的依赖关系、顺序执行、管理混乱
// 默认情况下，浏览器同步加载JS脚本，渲染引擎遇到Script标签会停下来，执行脚本完成后再继续向下渲染，外部脚本还需要加入脚本下载的时间
// 浏览器允许脚本异步加载，defer、async -> 异步加载，会先下载，不会等待它下载和执行，而是直接执行后面的命令
// defer：，才会执行；多个等到整个页面在内存中正常渲染结束脚本时，按顺序执行
// async：一旦下载完，渲染引擎就会中断渲染，执行这个脚本再继续渲染，多个脚本时，不能保证按顺序执行
// 巧记：defer的意思是延迟，表示这个js脚本延迟执行，下载肯定是下载的，延迟一下执行，等页面渲染完成后执行；async：意思是异步执行，下载完执行
// defer是渲染完再执行、async是下载完就执行
// CommonJS规范（同步加载模块）
// Node.js、Browserify require、module.exports
// AMD Asynchronous Module Definition 异步模块定义
// CMD Common Module Definition 通用模块定义 sea.js
// UMD Universal Module Definition 糅合了AMD和CommonJS，先判断是否支持exports，然后判断是否支持amd，否则将模块公开到全局（window、global）
// ES6 模块化，尽量静态化，使得编译时就能确认模块的依赖关系，以及输入和输出的变量

// 模块化的目标是支持大规模的程序开发，处理分散源中的代码的组装，并且能让代码正确运行，避免修改全局执行上下文
var MyModules = (function Manager() {
  var modules = {};

  function define(name, deps, impl) {
    for (var i = 0; i < deps.length; i++) {
      // 根据依赖数组，取出对应的模块
      deps[i] = modules[deps[i]];
    }
    modules[name] = impl.apply(impl, deps);
  }

  function get(name) {
    return modules[name];
  }

  return {
    define: define,
    get: get,
  };
})();

MyModules.define("bar", [], function () {
  function hello(who) {
    return "Let me introduce: " + who;
  }

  return {
    hello: hello,
  };
});

MyModules.define("foo", ["bar"], function (bar) {
  var hungry = "hippo";

  function awesome() {
    console.log(bar.hello(hungry).toUpperCase());
  }

  return {
    awesome: awesome,
  };
});

var bar = MyModules.get("bar");
var foo = MyModules.get("foo");

console.log(bar.hello("hippo"));

foo.awesome();

// 模块模式：调用包装了函数定义的包装函数，并且将返回值作为该模块的API
