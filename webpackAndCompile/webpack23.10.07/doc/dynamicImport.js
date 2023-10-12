(function (modules) {
  // 已经安装后的代码块ID 0 已加载成功
  let installedChunks = { main: 0 };
  function webpackJsonpCallback(data) {
    let [chunkIds, moreModules] = data;
    let resolves = [];
    for (let i = 0; i < chunkIds.length; i++) {
      let chunkId = chunkIds[i];
      let installedChunkData = installedChunks[chunkId]; // [resolve, reject, promise]
      resolves.push(installedChunkData[0]);
      installedChunks[chunkId] = 0;
    }
    // 把异步加载过来的代码块里面的模块合并到modules上面去
    for (let moduleId in moreModules) {
      modules[moduleId] = moreModules[moduleId];
    }
    // 兑现promise
    resolves.forEach((resolve) => resolve());
  }
  function __webpack_require__(moduleId) {
    let module = {
      i: moduleId,
      exports: {},
    };
    modules[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  // 懒加载代码块
  __webpack_require__.e = function (chunkId) {
    let promises = [];
    let installedChunkData = installedChunks[chunkId];
    if (installedChunkData !== 0) {
      if (installedChunkData) {
        promises.push(installedChunkData[2]);
      } else {
        let promise = new Promise(function (resolve, reject) {
          installedChunkData = [resolve, reject];
        });
        installedChunkData.push(promise); // [resolve,reject,promise]
        promises.push(promise);
        installedChunks[chunkId] = installedChunkData;
        let script = document.createElement("script");
        script.src = chunkId + ".js";
        document.head.appendChild(script);
      }
    }
    return Promise.all(promises);
  };
  __webpack_require__.t = function (value, mode) {
    // 表示value是模块id，需要require获取模块导出对象
    if (mode & 0b0001) {
      value = __webpack_require__(value);
    }
    // 不管是commonjs模块、还是es6模块都包装成一个es6模块
    let ns = Object.create(null);
    ns.__esModule = true;
    ns.default = value;
    for (const key in value) {
      ns[key] = value[key];
    }
    return ns;
  };
  // 这里为什么是个数组？为了缓存在内部，[data, data, data]
  window["webpackJsonp"] = [];
  let jsonArray = window["webpackJsonp"];
  jsonArray.push = webpackJsonpCallback;
  return __webpack_require__("./src/index.js");
})({
  "./src/index.js": function (module, exports, __webpack_require__) {
    let importButton = document.getElementById("import");
    importButton.addEventListener("click", () => {
      __webpack_require__
        .e(/*! import() | title */ "title")
        .then(
          __webpack_require__.t.bind(null, /*! ./title */ "./src/title.js", 7), // 0b0111
        )
        .then((result) => {
          console.log("动态导入title result", result);
        });
    });
  },
});
