const jszip = require("jszip");
const { RawSource } = require("webpack-sources");

class ZipPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.emit.tapAsync("ZipPlugin", (compilation, callback) => {
      let zip = new jszip();
      for (const filename in compilation.assets) {
        const source = compilation.assets[filename].source(); // 获取源代码
        zip.file(filename, source);
      }
      zip.generateAsync({ type: "nodebuffer" }).then((content) => {
        compilation.assets[this.options?.filename || "assets.zip"] =
          new RawSource(content);
        callback();
      });
    });
  }
}

module.exports = ZipPlugin;
