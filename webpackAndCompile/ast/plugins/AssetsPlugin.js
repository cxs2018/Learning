class AssetsPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap("AssetsPlugin", (compilation, params) => {
      compilation.hooks.chunkAsset.tap("AssetsPlugin", (chunk, filename) => {
        console.log("chunk=", chunk);
        console.log("filename=", filename);
      });
    });
  }
}

module.exports = AssetsPlugin;
