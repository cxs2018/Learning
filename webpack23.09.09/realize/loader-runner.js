const fs = require("fs")
const path = require("path")
const readFile = fs.readFile.bind(fs)
const PATH_QUERY_FRAGMENT_REGEXP = /^([^?#]*)(\?[^#]*)?(#.*)?$/

function parsePathQueryFragment(resource) {
  let result = PATH_QUERY_FRAGMENT_REGEXP.exec(resource)
  return {
    path: result[1] || '', // 路径名
    query: result[2] || '', // 参数
    fragment: result[3] || '' // 锚点
  }
}

/**
 * 创建Loader对象
 * @param {*} loader 绝对路径
 */
function createLoaderObject(loader) {
  let obj = {
    path: '', // 当前loader的绝对路径
    query: '', // 查询参数
    fragment: '', // 片段（锚点）
    normal: null,  // normal函数
    pitch: null, // pitch函数
    raw: null, // 原生、Buffer 文件
    data: {}, // 自定义对象，每个loader都会有一个data
    pitchExecuted: false, // 当前loader的pitch函数是否已经执行过了
    normalExecuted: false // 当前loader的normal函数是否已经执行过了
  }
  Object.defineProperty(obj, "request", {
    get() {
      return obj.path + obj.query + obj.fragment;
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

function loadLoader(loadObject) {
  let normal = require(loadObject.path)
  loadObject.normal = normal
  loadObject.pitch = normal.pitch
  loadObject.raw = normal.raw
}

function runSyncOrAsync(fn, context, args, callback) {
  let isSync = true; // 默认是同步
  let isDone = false; // 是否完成，是否执行过此函数了，默认是false
  context.async = function () {
    if (isDone) {
      throw new Error("这个callback已经调用过了")
    }
    isSync = false;
    return innerCallback;
  }
  const innerCallback = context.callback = function () {
    isDone = true; // 表示当前函数已经完成
    isSync = false; // 改为异步
    callback.apply(null, arguments) // 执行callback
  }
  let result = fn.apply(context, args)
  if (isSync) {
    isDone = true;
    return callback(null, result)
  }
}

function iteratePitchingLoaders(options, loaderContext, callback) {
  if (loaderContext.loaderIndex >= loaderContext.loaders.length) {
    return;
  }
  // 获取当前的loader loaderIndex=0 loader1
  let currentLoaderObject = loaderContext.loaders[loaderContext.loaderIndex]
  if (currentLoaderObject.pitchExecuted) {
    loaderContext.loaderIndex++;
    return iteratePitchingLoaders(options, loaderContext, callback)
  }
  loadLoader(currentLoaderObject)
  let pitchFunction = currentLoaderObject.pitch;
  currentLoaderObject.pitchExecuted = true; // 取过就算执行过
  if (!pitchFunction) {
    return iteratePitchingLoaders(options, loaderContext, callback)
  } else {
    runSyncOrAsync(pitchFunction, loaderContext, [loaderContext.remainingRequest, loaderContext.previousRequest, loaderContext.data], function (err, args) {
      if (args) {
        // 如果 args 有值，说明 pitch 有返回值
        loaderContext.loaderIndex--; // 索引减1，开始回退了
        // iterateNormalLoaders(options, loaderContext, args, callback)
      } else {
        // 如果没有返回值，则执行下一个loader的pitch函数
        iteratePitchingLoaders(options, loaderContext, callback)
      }
    })
  }
}

exports.runLoaders = function (options, callback) {
  let resource = options.resource || ""; // 要加载的资源路径
  let loaders = options.loaders || []; // Loader数组
  let loaderContext = {} // loader执行时的上下文对象，这个对象将会成为loader执行时的this指针
  let readSource = options.readSource || readFile; // 读文件内容，fs、memory-fs等
  let splittedResource = parsePathQueryFragment(resource)
  let resourcePath = splittedResource.path;
  let resourceQuery = splittedResource.query;
  let resourceFragment = splittedResource.fragment;
  let contextDirectory = path.dirname(resourcePath) // 此文件所在的上下文对象（文件夹）
  loaders = loaders.map(createLoaderObject);  // 准备loader对象
  loaderContext.context = contextDirectory;   // 要加载的资源的所在目录
  loaderContext.loaderIndex = 0; // 当前执行loader的索引
  loaderContext.loaders = loaders;
  loaderContext.resourcePath = resourcePath;
  loaderContext.resourceQuery = resourceQuery;
  loaderContext.resourceFragment = resourceFragment
  loaderContext.async = null; // 一个方法，将loader的执行从同步改为异步
  loaderContext.callback = null;// 调用下一个loader
  // loaderContext.resource 代表要加载的资源 ./src/index.js，不包含要加载的loader
  Object.defineProperty(loaderContext, "resource", {
    get() {
      return loaderContext.resourcePath + loaderContext.resourceQuery + loaderContext.resourceFragment
    }
  })
  // request = loader1!loader2!resource.js
  Object.defineProperty(loaderContext, "request", {
    get() {
      return loaderContext.loaders.map(l => l.request).concat(loaderContext.resource).join("!");
    }
  })
  // 剩下的 request
  Object.defineProperty(loaderContext, "remainingRequest", {
    get() {
      return loaderContext.loaders.slice(loaderContext.loaderIndex + 1).map(l => l.request).concat(loaderContext.resource).join("!")
    }
  })
  // 当前的 request，包含当前正在执行的loader
  Object.defineProperty(loaderContext, "currentRequest", {
    get() {
      return loaderContext.loaders.slice(loaderContext.loaderIndex).map(l => l.request).concat(loaderContext.resource).join("!")
    }
  })
  // 之前的loader，执行过的loader
  Object.defineProperty(loaderContext, "previousRequest", {
    get() {
      return loaderContext.loaders.slice(0, loaderContext.loaderIndex).map(l => l.request).join("!")
    }
  })
  Object.defineProperty(loaderContext, "query", {
    get() {
      let loader = loaderContext.loaders[loaderContext.loaderIndex]
      return loader.options || loader.query
    }
  })
  Object.defineProperty(loaderContext, "data", {
    get() {
      let loader = loaderContext.loaders[loaderContext.loaderIndex]
      return loader.data
    }
  })
  let processOptions = {
    resourceBuffer: null, // 最终loader执行的结果放到这个，Buffer格式,
    readSource,
  }
  iteratePitchingLoaders(processOptions, loaderContext, function (err, result) {
    if (err) {
      return callback(err, {})
    }
    callback(null, {
      result,
      resourceBuffer: processOptions.resourceBuffer
    })
  });
}