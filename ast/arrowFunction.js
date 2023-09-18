let babel = require("@babel/core"); // js origin code -> ast
let t = require("babel-types"); // 判断某个节点是否是某种类型，或者创建一个新的某种类型的节点
// const arrowFunctionPlugin = require("babel-plugin-transform-es2015-arrow-functions");

let code = "const sum = (a,b) => a+b";

let arrowFunctionPlugin = {
  visitor: {
    // babel在遍历到arrowFunctionExpression这个类型的节点的时候，会把当时的路径传过来
    arrowFunctionExpression: (path) => {
      let node = path.node; // 当前路径上的节点
      let id = path.parent.id;
      t.functionExpression();
    },
  },
};

// babel本身只是一个引擎，并不能转换源代码
let result = babel.transform(code, {
  plugins: [arrowFunctionPlugin],
});

console.log(result.code);
