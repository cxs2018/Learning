// 手写tree-shaking
let t = require("babel-types"); // 判断某个节点是否是某种类型，或者创建一个新的某种类型的节点

let visitor = {
  ImportDeclaration: {
    enter(path, state = { opts }) {
      const specifiers = path.node.specifiers;
      const source = path.node.source;
      // 默认导入的不转换，只处理命名导入
      if (
        state.opts.library === source.value &&
        !t.isImportDefaultSpecifier(specifiers[0])
      ) {
        const newImportDeclarations = specifiers.map((specifier, index) => {
          return t.importDeclaration(
            [t.importDefaultSpecifier(specifier.local)],
            t.stringLiteral(`${source.value}/${specifier.imported.name}`)
          );
        });
        path.replaceWithMultiple(newImportDeclarations);
      }
    },
  },
};

module.exports = function () {
  return {
    visitor,
  };
};
