class Chunk {
  constructor(entryModule) {
    this.entryModule = entryModule;
    this.name = entryModule.name;
    this.files = []; // 这个代码块生成了哪些文件
    this.modules = []; // 这个代码块包含了哪些模块
  }
}

module.exports = Chunk;
