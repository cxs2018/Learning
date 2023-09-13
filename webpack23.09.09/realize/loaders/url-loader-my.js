const path = require("path");
const mime = require("mime");

function loader(content) {
  console.log("hello dear url loader my");
  let options = this.query || {};
  let { limit, filename, fallback = "./file-loader-my" } = options;
  if (limit) {
    limit = parseInt(limit, 10);
  }
  const mimeType = mime.getType(this.resourcePath); // .jpg -> image/jpeg
  if (!limit || content.length < limit) {
    let base64String = `data:${mimeType};base64,${content.toString("base64")}`;
    return `export default ${JSON.stringify(base64String)}`;
  } else {
    let fileLoader = require(fallback || "file-loader"); // 这里不像webpack config配置里的可以指定寻找模块的路径，这里要么用原始的，要么用相对路径找到自己的loader
    return fileLoader.call(this, content);
  }
}

loader.raw = true;

module.exports = loader;
