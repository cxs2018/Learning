// 模版字面量标签函数 tag function -> 自定义插值行为，标签函数会接收被插值记号分割后的模版和对每个表达式求值的结果
// 前缀到模版字面量来自定义行为
let a = 6;
let b =9;
function simpleTag(strings, aValExpression, bValExpression, sumExpression) {
  console.log(strings)
  console.log(aValExpression)
  console.log(bValExpression)
  console.log(sumExpression)
  return 'hello world!'
}

function zipTag(strings, ...expressions) {
  return strings[0] + expressions.map((e,i) => `${e}${strings[i+1]}`).join("");
}

let untaggedResult = `abc${a} + ${b} = ${a+b}erf`
let taggedResult = zipTag`a${a} + ${b} = ${a+b}c`

console.log(untaggedResult, taggedResult)
// 剩余操作符 rest operator

console.log(`first line
second line
`)


console.log(String.raw`first line
second line`); 

console.log(`first line\nsecond line`);
console.log(String.raw`first line\nsecond line`);

console.log(`\u00A9`); // ©
console.log(String.raw`\u00A9`); 

function printRaw(strings, firstExpression) {
  console.log("firstExpression", firstExpression)

  console.log("Actual characters:");
  for (const string of strings) {
    console.log(string)
  }

  console.log("Escaped characters:")
  for (const rawString of strings.raw) {
    console.log(rawString)
  }
}

printRaw`\u00A9${'and'}\n`