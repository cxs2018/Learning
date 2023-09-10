const path = require("path");
const fs = require("fs");

class Compiler {
  constructor(config) {
    this.config = config;
  }

  run() {
    let entries = [];
    let modules = [];
    let chunks = [];
    let assets = []; // key是文件名，值是文件内容
    let files = []; // 元素都是文件名 files=Object.keys(assets)

    let entry = path.join(this.config.context.this.config.entry);
    entries.push({ name: "main", entry });
    let entryContent = fs.readFileSync(entry, "utf-8");
    let entrySource = babelLoader(entryContent);
    let entryModule = {
      id: "./src/index.js",
      source: entrySource,
      name: "main",
    };
    modules.push(entryModule);
    // 把entryModule编译成AST，找到里面的依赖，require、import，递归编译所有模块
    let cssModulePath = path.join(this.config.context, "./src/index.css");
    let cssContent = fs.readFileSync(cssModulePath, "utf-8");
    let cssSource = cssLoader(cssContent);
    let cssModule = { id: "./src/index.css", source: cssSource, name: "main" };
    modules.push(cssModule);

    let chunk = { id: "main", modules: [entryModule, cssModule] };
    chunks.push(chunk);

    for (const chunk of chunks) {
      assets[chunk.id + ".js"] = "main.js的文件内容";
    }
    files = Object.keys(assets); // 要写入硬盘的文件名数组
    for (const fileName in assets) {
      let filePath = path.join(
        this.config.output.path,
        this.config.output.filename
      );
      fs.writeFileSync(filePath, assets[fileName]);
    }
  }
}

let config = require("./webpack.config.js");

let compiler = new Compiler(config);

for (const plugin of config.plugins) {
  plugin.apply(compiler);
}

compiler.run();

// loader本质是一个函数，如babel，将es6等转换为es5
function babelLoader(source) {
  return source;
}

// 转换css
function cssLoader(source) {
  // 一段js
  return `
  let style = document.createElement("style");
  style.innerHTML = "body {background-color:red;}"
  document.head.appendChild(style);
  `;
}
