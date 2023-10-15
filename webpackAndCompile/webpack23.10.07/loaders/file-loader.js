/**
 * filename 作用
 * 将图片拷贝到dist目录，然后将路径导出
 */
const { getOptions, interpolateName } = require("loader-utils");

function loader(content) {
  let options = getOptions(this) || {};
  let url = interpolateName(this, options.filename || "[hash].[ext]", {
    content,
  });
  console.log("file-loader ", url);
  this.emitFile(url, content);
  return `module.exports = ${JSON.stringify(url)}`;
}

loader.raw = true;
module.exports = loader;
