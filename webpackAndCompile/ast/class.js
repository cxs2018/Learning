let babel = require("@babel/core"); // js origin code -> ast
let t = require("babel-types"); // 判断某个节点是否是某种类型，或者创建一个新的某种类型的节点
// const classPlugin = require("babel-plugin-transform-es2015-classes");

let code = `class Person {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}`


let classPlugin = {
  visitor: {
    ClassDeclaration(path) {
      let node = path.node;
      let id = node.id;
      let methods = node.body.body; // 方法名数组
      let constructorFunction;
      let newNodes = [];
      methods.forEach(method => {
        if (method.kind === 'constructor') {
          constructorFunction = t.functionExpression(id, method.params, method.body, method.generator, method.async)
          newNodes.push(constructorFunction)
        } else {
          let memberExpression = t.memberExpression(t.memberExpression(id, t.identifier("prototype")), method.key)
          let functionExpression = t.functionExpression(null, method.params, method.body, method.generator, method.async)
          let assignmentExpression = t.assignmentExpression("=", memberExpression, functionExpression);
          newNodes.push(assignmentExpression)
        }
      })
      path.replaceWithMultiple(newNodes);
    }
  }
}

// babel本身只是一个引擎，并不能转换源代码
let result = babel.transform(code, {
  plugins: [classPlugin]
});

console.log(result.code);
