let fs = require("fs")

class NodeEnvironmentPlugin {
  constructor(props) {
    this.props = props || {}
  }

  apply(compiler) {
    compiler.inputFileSystem = fs; // 读文件 系统 fs.readFile
    compiler.outputFileSystem = fs; // 写文件 系统 fs.writeFile
  }
}

module.exports = NodeEnvironmentPlugin