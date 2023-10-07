const SingleEntryPlugin = require("./SingleEntryPlugin");

const itemToPlugin = (context, entry, name) => {
  // 单入口插件
  return new SingleEntryPlugin(context, entry, name);
};

class EntryOptionPlugin {
  apply(compiler) {
    compiler.hooks.entryOption.tap("EntryOptionPlugin", (context, entry) => {
      if (typeof entry === "string") {
        // 单入口
        itemToPlugin(context, entry, "main").apply(compiler);
      } else {
        // 多入口
        for (const entryName in entry) {
          itemToPlugin(context, entry[entryName], entryName).apply(compiler);
        }
      }
    });
  }
}

module.exports = EntryOptionPlugin;
