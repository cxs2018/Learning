/**
 * 分词
 * 有限状态机
 */
let NUMBERS = /[0-9]/;
const Number = "Number";
let tokens = [];

let currentToken;

function start(char) {
  if (NUMBERS.test(char)) {
    // 数字
    currentToken = {
      type: Number,
      value: "",
    };
  }
  // 进入新的状态了，收集数字
  return number(char);
}

function number(char) {
  if (NUMBERS.test(char)) {
    currentToken.value += char;
    return number;
  } else if (char === "+" || char === "-") {
    console.log("遇到操作符了", currentToken);
    emit(currentToken);
    emit({ type: "Punctuator", value: char });
    currentToken = {
      type: Number,
      value: "",
    };
    return number;
  }
}

/**
 * 一个新的token确定了
 * @param token
 */
function emit(token) {
  currentToken = {
    type: "",
    value: "",
  };
  tokens.push(token);
}

function tokenizer(input) {
  let state = start;
  for (let char of input) {
    state = state(char);
  }
  if (currentToken.value.length > 0) {
    emit(currentToken);
  }
}

tokenizer("10+20");
console.log(tokens);
