const itemToPlugin = (context, item, name) => {
  // 单入口插件
  return new SingleEntryPlugin(context, item, name)
}

class EntryOptionPlugin {
  apply(compiler) {
    compiler.hooks.entryOption.tap("EntryOptionPlugin", (context, entry) => {
      itemToPlugin(context, entry, "main").apply(compiler)
    })
  }
}

module.exports = EntryOptionPlugin