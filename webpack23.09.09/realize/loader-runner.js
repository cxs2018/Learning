const fs = require("fs")
const path = require("path")
const readFile = fs.readFile.bind(fs)
const PATH_QUERY_FRAGMENT_REGEXP = /^([^?#]*)(\?[^#]*)?(#.*)?$/

function parsePathQueryFragment(resource) {
  let result = PATH_QUERY_FRAGMENT_REGEXP.exec(resource)
  return {
    path: result[1], // 路径名
    query: result[2], // 参数
    fragment: result[3] // 锚点
  }
}

/**
 * 创建Loader对象
 * @param {*} loader 绝对路径
 */
function createLoaderObject(loader) {
  let obj = {
    path: null, // 当前loader的绝对路径
    query: null, // 查询参数
    fragment: null, // 片段（锚点）
    normal: null,  // normal函数
    pitch: null, // pitch函数
    raw: null, // 原生、Buffer 文件
    data: {}, // 自定义对象，每个loader都会有一个data
    pitchExecuted: false, // 当前loader的pitch函数是否已经执行过了
    normalExecuted: false // 当前loader的normal函数是否已经执行过了
  }
  Object.defineProperty(obj, "request", {
    get() {
      return obj.path + obj.query
    },
    set() {
      let splittedRequest = parsePathQueryFragment(loader)
      obj.path = splittedRequest.path;
      obj.query = splittedRequest.query;
      obj.fragment = splittedRequest.fragment;
    }
  })
  obj.request = loader;
  return obj
}

exports.runLoaders = function (options, callback) {
  let resource = options.resource || ""; // 要加载的资源路径
  let loaders = options.loaders || []; // Loader数组
  let loaderContext = {} // loader执行时的上下文对象，这个对象将会成为loader执行时的this指针
  let readSource = options.readSource || readFile; // 读文件内容，fs、memory-fs等
  let splittedResource = parsePathQueryFragment(resource)
  let resourcePath = splittedResource.path;
  let resourceQuery = splittedResource.query;
  let contextDirectory = path.dirname(resourcePath) // 此文件所在的上下文对象（文件夹）
  // 准备loader对象
  loaders.map(createLoaderObject)
}