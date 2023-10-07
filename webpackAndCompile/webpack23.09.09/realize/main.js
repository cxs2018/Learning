(function (modules) {
  function webpackJsonpCallback([chunkIds, moreModules]) {
    // 把异步加载过来的代码块合并到modules上去，以便可以在本函数中通过 __webpack_require__ 方法加载
    for (const moduleId in moreModules) {
      modules[moduleId] = moreModules[moduleId];
    }
    for (let chunkId of chunkIds) {
      let [resolve] = installedChunks[chunkId];
      resolve();
    }
  }

  // 缓存的模块
  let installedModules = {};

  // 加载的代码块
  let installedChunks = {
    main: 0,
  };

  function __webpack_require__(moduleId) {
    // 先取缓存的
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // 先创建一个新的模块对象，放到缓存中
    let module = (installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {},
    });
    modules[moduleId].call(
      module.exports,
      module,
      module.exports,
      __webpack_require__
    );
    module.l = true;
    return module.exports;
  }

  __webpack_require__.e = function (chunkId) {
    let installedChunkData;
    let promise = new Promise(function (resolve, reject) {
      installedChunkData = [resolve, reject];
    });
    installedChunkData.push(promise);
    installedChunks[chunkId] = installedChunkData;

    let script = document.createElement("script");
    script.src = chunkId + ".js";
    document.head.appendChild(script);

    return promise;
  };

  __webpack_require__.t = function (value, mode) {
    debugger;
    if (mode & 0b0001) {
      // 获取导出值
      value = __webpack_require__(value);
    }
    if (mode & 0b1000) {
      // 不需要包装成 es module，直接返回
      return value;
    }
    if (mode & 0b0100 && value.__esModule) {
      // 如果模块已经包装好，或者本身就是一个 es6 模块，直接返回
      return value;
    }
    // 创建一个干净的对象，没有原型属性和方法
    let ns = Object.create(null);
    Object.defineProperty(ns, "__esModule", { value: true });
    Object.defineProperty(ns, "default", { value });
    if (mode & 0b0010) {
      // 合并value上的属性拷贝到ns上
      for (const key in value) {
        ns[key] = value[key];
      }
    }
    return ns;
  };

  let jsonArray = [];
  window["webpackJsonp"] = jsonArray;
  window["webpackJsonp"].push = webpackJsonpCallback;

  return __webpack_require__("./src/index.js");
})({
  "./src/index.js": function (module, exports, __webpack_require__) {
    document.getElementById("btn").addEventListener("click", () => {
      __webpack_require__
        .e("title")
        .then(__webpack_require__.t.bind(null, "./src/title.js", 7))
        .then((result) => {
          console.log(result, result.default);
        });
    });
  },
});
