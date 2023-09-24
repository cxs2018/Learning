class HashPlugin {
  apply(compiler) {
    compiler.hooks.compilation.tap("HashPlugin", (compilation) => {
      compilation.hooks.afterHash.tap("HashPlugin", () => {
        compilation.hash = "hash";
        let chunks = compilation.chunks;
        for (const chunk of chunks) {
          chunk.renderedHash = chunk.name + "_chunkhash";
          chunk.contentHash = { javascript: "newContentHash" };
        }
      });
    });
  }
}

module.exports = HashPlugin;
