/**
 * 生成一个新的文件名
 * 向输出列表里添加一个输出文件
 * @param {*} content
 */
let { getOptions, interpolateName } = require("loader-utils");
const path = require("path");

function loader(content) {
  console.log("hello dear file loader my");
  // let options = getOptions(this) || {}; // 已废弃
  let options = this.query || {}; // webpack5写法
  let filename = myInterpolateName(this, options.filename || "[hash].[ext]", {
    content,
  });
  // 向输出列表里添加一个输出的文件
  this.emitFile(filename, content);
  // module.exports 导出的直接就是一个路径
  // 如果使用 export default 导出，导入时候，需要添加一个 .default
  return `export default ${JSON.stringify(filename)}`;
}

// 加载的是二进制文件，所以需要让content是buffer
loader.raw = true;

module.exports = loader;

function myInterpolateName(loaderContext, name, options) {
  let filename = name || "[hash].[ext]";
  let ext = path.extname(loaderContext.resourcePath).slice(1);
  let hash = require("crypto")
    .createHash("md5")
    .update(options.content)
    .digest("hex");
  filename = filename.replace(/\[hash\]/gi, hash).replace(/\[ext\]/gi, ext);
  return filename;
}

/**
 * file-loader作用
 * require("./xx.png")，webpack处理不了这种图片，require 处理不了图片
 * 当发现有使用这种方式引用，同时提供了匹配 .png的规则，就会去调用 file-loader
 * fileloader会先获取新图片的名字，根据配置中的filename，如 hash、ext 等，计算hash，获取ext 文件扩展类型，然后调用webpack的emitFile方法
 * 将文件输出到新的位置，代码里引用的图片就会改为新的位置
 */
