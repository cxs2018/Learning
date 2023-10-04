const LETTERS = /[a-z0-9]/; // 字母、数字 标识符

const tokenTypes = require("./tokenTypes");

let currentToken = { type: "", value: "" };
const tokens = [];

function emit(token) {
  currentToken = { type: "", value: "" };
  tokens.push(token);
}

function start(char) {
  if (char === "<") {
    emit({ type: tokenTypes.LeftParentheses, value: "<" });
    return foundLeftParentheses; // 找到了 <
  }
  throw new Error("第一个字符必须是<");
}

function eof() {
  if (currentToken.value.length > 0) {
    emit(currentToken);
  }
}

function foundLeftParentheses(char) {
  if (LETTERS.test(char)) {
    currentToken.type = tokenTypes.JSXIdentifier;
    currentToken.value += char;
    return jsxIdentifier; // 继续收集标识符
  } else if (char === "/") {
    emit({ type: tokenTypes.BackSlash, value: "/" });
    return foundLeftParentheses;
  }
  throw new TypeError("Error");
}

function jsxIdentifier(char) {
  if (LETTERS.test(char)) {
    currentToken.value += char;
    return jsxIdentifier; // 继续收集标识符
  } else if (char === " ") {
    // 遇到空格，表示一个标识符收集完成
    emit(currentToken);
    return attribute;
  } else if (char === ">") {
    // 发现了一个标签结束符，表示一个标识符收集完成
    emit(currentToken);
    emit({ type: tokenTypes.RightParentheses, value: ">" });
    return foundRightParentheses;
  }
  throw new TypeError("Error");
}

function attribute(char) {
  if (LETTERS.test(char)) {
    currentToken.type = tokenTypes.AttributeKey;
    currentToken.value += char;
    return attributeKey;
  }
  throw new TypeError("属性名必须是字母或数字");
}

function attributeKey(char) {
  if (LETTERS.test(char)) {
    currentToken.value += char;
    return attributeKey;
  } else if (char === "=") {
    // 遇到等于号，表示一个属性名收集完成
    emit(currentToken);
    return attributeValue;
  }
  throw new TypeError("Error");
}

function attributeValue(char) {
  if (char === '"') {
    // 遇到了双引号
    currentToken.type = tokenTypes.AttributeStringValue;
    currentToken.value = "";
    return attributeStringValue;
  }
  throw new TypeError("Error");
}

function attributeStringValue(char) {
  if (LETTERS.test(char)) {
    currentToken.value += char;
    return attributeStringValue;
  } else if (char === '"') {
    // 读到了一个双引号，表示一个字符串属性值收集结束了
    emit(currentToken);
    return tryLeaveAttribute;
  }
  throw new TypeError("Error");
}

/**
 * 后面可能是标签结束 >，也可能是一个空格，表示后面有新属性
 * TODO 空格后面跟着 > 的情况
 * @param char
 */
function tryLeaveAttribute(char) {
  if (char === " ") {
    return attribute; // 准备收集下一个属性
  } else if (char === ">") {
    emit({ type: tokenTypes.RightParentheses, value: ">" });
    return foundRightParentheses;
  }
  throw new TypeError("Error");
}

function foundRightParentheses(char) {
  if (char === "<") {
    emit({ type: tokenTypes.LeftParentheses, value: "<" });
    return foundLeftParentheses;
  } else {
    currentToken.type = tokenTypes.JSXText;
    currentToken.value += char;
    return jsxText;
  }
}

function jsxText(char) {
  if (char === "<") {
    emit(currentToken);
    emit({ type: tokenTypes.LeftParentheses, value: "<" });
    return foundLeftParentheses;
  } else {
    currentToken.value += char;
    return jsxText;
  }
}

function tokenizer(input) {
  let state = start;
  for (let char of input) {
    state = state(char);
  }
  console.log("end function", state);
  return tokens;
}

module.exports = {
  tokenizer,
};

let code = '<h1 id="title"><span>hello</span>world</h1>';

console.log(tokenizer(code));
