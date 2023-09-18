let esprima = require("esprima");
let estraverse = require("estraverse");
let escodepen = require("escodegen");

let code = "function ast() {}";
let ast = esprima.parseScript(code);
console.log(ast);
let indent = 0;

function padding() {
  return " ".repeat(indent);
}

estraverse.traverse(ast, {
  enter(node) {
    console.log(padding() + node.type + "进入");
    if (node.type === "FunctionDeclaration") {
      node.id.name = "newAst";
    }
    indent += 2;
  },
  leave(node) {
    indent -= 2;
    console.log(padding() + node.type + "离开");
  },
});

let newCode = escodepen.generate(ast);

console.log(newCode);
