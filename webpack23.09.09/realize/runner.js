/**
 * loader 类型，pre、normal、inline、post
 */
let path = require("path")
let fs = require("fs")
let { runLoaders } = require("loader-runner")
let loadDir = path.resolve(__dirname, 'loaders')
let request = "inline-loader1!inline-loader2!./src/index.js"
let inlineLoaders = request.replace(/^-?!+/, "").replace(/!!+/g, "!").split("!")
let resource = inlineLoaders.pop() // 要加载的资源路径
// 参数是loader的名字，返回值是loader的绝对路径
let resolveLoader = (loader) => path.resolve(loadDir, loader)
inlineLoaders = inlineLoaders.map(resolveLoader)

let rules = [
  {
    enforce: "pre",
    test: /\.js$/,
    use: ["pre-loader1", "pre-loader2"]
  },
  {
    test: /\.js$/,
    use: ["normal-loader1", "normal-loader2"],
  },
  {
    enforce: "post",
    test: /\.js$/,
    use: ["post-loader1", "post-loader2"]
  }
]

let preLoaders = []
let postLoaders = []
let normalLoaders = []
for (let i = 0; i < rules.length; i++) {
  let rule = rules[i];
  if (rule.test.test(resource)) {
    if (rule.enforce === 'pre') {
      preLoaders.push(...rule.use)
    } else if (rule.enforce === 'post') {
      postLoaders.push(...rule.use)
    } else {
      normalLoaders.push(...rule.use)
    }
  }
}

preLoaders = preLoaders.map(resolveLoader)
postLoaders = postLoaders.map(resolveLoader)
normalLoaders = normalLoaders.map(resolveLoader)

let loaders;

if (request.startsWith("!!")) {
  // 只要内联
  loaders = inlineLoaders;
} else if (request.startsWith("-!")) {
  // 不要前置和普通
  loaders = [...postLoaders, ...inlineLoaders]
} else if (request.startsWith("!")) {
  // 去掉普通loaders
  loaders = [...postLoaders, ...inlineLoaders, ...preLoaders]
} else {
  // 所有loader
  loaders = [...postLoaders, ...inlineLoaders, ...normalLoaders, ...preLoaders]
}

/**
 * loader1       <-     loader2     <-    loader3
 *                                          ^
 *                                          ^
 * loader1.pitch -> loader2.pitch -> loader3.pitch
 */

// console.log("loaders", loaders)

runLoaders({
  resource: path.join(__dirname, resource),
  loaders,
  readResource: fs.readFile.bind(fs)
}, (err, result) => {
  console.log(err, result)
})