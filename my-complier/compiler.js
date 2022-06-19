// 词法分析器
function tokenizer(input) {
  // 输入字符串处理的索引
  let current = 0;
  // token列表
  let tokens = [];

  // 遍历字符串，解析token
  while (current < input.length) {
    let char = input[current];

    // 匹配左括号
    if (char === "(") {
      // type为'paren'，value为左圆括号的对象
      tokens.push({
        type: "paren",
        value: "(",
      });

      // current自增
      current++;

      // 结束本次循环，进入下一次循环
      continue;
    }

    // 匹配右括号
    if (char === ")") {
      // type为'paren'，value为右圆括号的对象
      tokens.push({
        type: "paren",
        value: ")",
      });
      current++;
      continue;
    }

    let WHITESPACE = /\s/;
    // 正则匹配空白字符，跳过空白字符
    if (WHITESPACE.test(char)) {
      current++;
      continue;
    }

    let NUMBERS = /[0-9]/;
    // 正则匹配数字
    if (NUMBERS.test(char)) {
      let value = "";
      // 匹配连续数字，作为value
      while (NUMBERS.test(char)) {
        value += char;
        char = input[++current];
      }
      // type为'number'，value为数字字符串
      tokens.push({
        type: "number",
        value,
      });
      continue;
    }

    if (char === '"') {
      let value = "";
      // 跳过左双引号
      char = input[++current];
      // 获取双引号之间的所有字符串
      while (char !== '"') {
        value += char;
        char = input[++current];
      }
      // 跳过右双引号
      char = input[++current];
      // type为'string'，value为字符串参数
      tokens.push({
        type: "string",
        value,
      });
      continue;
    }

    // 匹配函数名
    let LETTERS = /[a-z]/i; // 修饰符 i 表示不区分大小写
    if (LETTERS.test(char)) {
      let value = "";

      // 获取连续字符
      while (LETTERS.test(char)) {
        value += char;
        char = input[++current];
      }

      // type为'name'，value为函数名
      tokens.push({
        type: "name",
        value,
      });
      continue;
    }

    // 无法识别的字符，抛出错误提示
    throw new TypeError(`I dont know what this character is: ${char}`);
  }
  // 返回词法分析器token列表
  return tokens;
}

// 语法分析器

function parser(tokens) {
  // token列表索引
  let current = 0;
  // 采用递归的方式遍历token列表
  function walk() {
    // 获取当前token
    let token = tokens[current];

    // 数字类token
    if (token.type === "number") {
      current++;

      // 生成NumberLiteral节点
      return {
        type: "NumberLiteral",
        value: token.value,
      };
    }

    // 字符串类token
    if (token.type === "string") {
      current++;

      // 生成StringLiteral节点
      return {
        type: "StringLiteral",
        value: token.value,
      };
    }

    // 函数名
    if (token.type === "paren" && token.value === "(") {
      // 跳过左括号，获取下一个token作为函数名
      token = tokens[++current];

      let node = {
        type: "CallExpression",
        name: token.value,
        params: [],
      };

      token = tokens[++current];

      // 右括号前的内容就是参数
      while (
        token.type !== "paren" ||
        (token.type === "paren" && token.value !== ")")
      ) {
        // 递归遍历参数
        node.params.push(walk());
        token = tokens[current];
      }

      // 跳过右括号
      current++;

      return node;
    }

    // 无法识别的字符，抛出错误提示
    throw new TypeError(token.type);
  }

  // AST的根节点
  let ast = {
    type: "Program",
    body: [],
  };

  // 填充ast.body
  while (current < tokens.length) {
    ast.body.push(walk());
  }

  // 返回AST
  return ast;
}

// 遍历器
function traverser(ast, visitor) {
  // 遍历数组中的节点
  function traverseArray(array, parent) {
    array.forEach((child) => {
      traverseNode(child, parent);
    });
  }

  // 遍历节点，参数为当前节点及其父节点
  function traverseNode(node, parent) {
    // 获取访问者对象上的对应的方法
    let methods = visitor[node.type];
    // 执行访问者的enter方法
    if (methods && methods.enter) {
      methods.enter(node, parent);
    }

    switch (node.type) {
      // 根节点
      case "Program":
        traverseArray(node.body, node);
        break;
      // 函数调用
      case "CallExpression":
        traverseArray(node.params, node);
        break;
      // 数值和字符串，不用处理
      case "NumberLiteral":
      case "StringLiteral":
        break;
      // 无法识别的字符，抛出错误提示
      default:
        throw new TypeError(node.type);
    }
    if (methods && methods.exit) {
      methods.exit(node, parent);
    }
  }

  traverseNode(ast, null);
}

// 转换器
function transformer(ast) {
  // 创建一个新AST
  let newAst = {
    type: "Program",
    body: [],
  };

  // 通过_context引用，更新新旧节点
  ast._context = newAst.body;

  // 使用遍历器遍历原始ast
  traverser(ast, {
    // 数字节点，直接原样插入新AST
    NumberLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: "NumberLiteral",
          value: node.value,
        });
      },
      exit(node, parent) {},
    },
    // 字符串节点，直接原样插入新ast
    StringLiteral: {
      enter(node, parent) {
        parent._context.push({
          type: "StringLiteral",
          value: node.value,
        });
      },
      exit(node, parent) {},
    },
    // 函数调用
    CallExpression: {
      enter(node, parent) {
        // 创建不同的AST节点
        let expression = {
          type: "CallExpression",
          callee: {
            type: "Identifier",
            name: node.name,
          },
          arguments: [],
        };
        // 同样通过_context引用参数，供子节点使用
        node._context = expression.arguments;

        // 顶层函数调用本质上是一个语句，写成特殊节点`ExpressionStatement`
        if (parent.type !== "CallExpression") {
          expression = {
            type: "ExpressionStatement",
            expression,
          };
        }
        parent._context.push(expression);
      },
      exit(node, parent) {},
    },
  });

  return newAst;
}

// 代码生成器
function codeGenerator(node) {
  // 判断节点类型
  switch (node.type) {
    // 根节点，递归body节点列表
    case "Program":
      return node.body.map(codeGenerator).join("\n");
    case "ExpressionStatement":
      return `${codeGenerator(node.expression)};`;
    case "CallExpression":
      return `${codeGenerator(node.callee)}(${node.arguments
        .map(codeGenerator)
        .join(", ")})`;
    // 标识符，数值，直接输出
    case "Identifier":
      return node.name;
    case "NumberLiteral":
      return node.value;
    // 字符串，用双引号包起来
    case "StringLiteral":
      return `"${node.value}"`;
    // 无法识别的字符，抛出错误提示
    default:
      throw new TypeError(node.type);
  }
}

// 编译器
function compiler(input) {
  const tokens = tokenizer(input);

  const ast = parser(tokens);

  const newAst = transformer(ast);

  const output = codeGenerator(newAst);

  return output;
}

console.log(compiler("(add 2 (subtract 4 2))"));
