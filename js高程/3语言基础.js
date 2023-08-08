// 模版字面量标签函数 tag function -> 自定义插值行为，标签函数会接收被插值记号分割后的模版和对每个表达式求值的结果
// 前缀到模版字面量来自定义行为
let a = 6;
let b = 9;
function simpleTag(strings, aValExpression, bValExpression, sumExpression) {
  console.log(strings)
  console.log(aValExpression)
  console.log(bValExpression)
  console.log(sumExpression)
  return 'hello world!'
}

function zipTag(strings, ...expressions) {
  return strings[0] + expressions.map((e, i) => `${e}${strings[i + 1]}`).join("");
}

let untaggedResult = `abc${a} + ${b} = ${a + b}erf`
let taggedResult = zipTag`a${a} + ${b} = ${a + b}c`

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

// Symbol.species 一个函数值，该函数作为创建派生对象的构造函数
class Bar extends Array { }
class Baz extends Array {
  static get [Symbol.species]() {
    return Array;
  }
}
let bar = new Bar();
console.log(bar instanceof Array); // true
console.log(bar instanceof Bar); // true
bar = bar.concat('bar');
console.log(bar instanceof Array); // true
console.log(bar instanceof Bar); // true
let baz = new Baz();
console.log(baz instanceof Array); // true
console.log(baz instanceof Baz); // true
baz = baz.concat('baz');
console.log(baz instanceof Array); // true
console.log(baz instanceof Baz); // false

// 这个属性在内置类似中最常用，用于对内置类型实例方法的返回值暴露实例化派生对象的方法
// 实例方法返回值的类型是派生类，重写Symbol.species方法后

// String.prototype.split() 方法会使用以 Symbol.split 为键的函数来对正则表达式求值

class Foo { }
let foo = new Foo();
console.log(3 + foo); // "3[object Object]"
console.log(3 - foo); // NaN
console.log(String(foo)); // "[object Object]"
class Bar2 {
  constructor() {
    this[Symbol.toPrimitive] = function (hint) {
      switch (hint) {
        case 'number':
          return 3;
        case 'string':
          return 'string bar';
        case 'default':
        default:
          return 'default bar';
      }
    }
  }
} 
let bar2 = new Bar2();
console.log(3 + bar2); // "3default bar"
console.log(3 - bar2); // 0
console.log(String(bar2)); // "string bar"

// unary operator 一元操作符
// 位操作符，数值的底层操作，操作内存中表示数据的比特位 IEE754 64位
// 位操作并不知节应用到64位表示，而是先把值转换为32位整数，再进行位操作，之后再把结果转换位64位
// 有符号整数，32位
// 负值，二补数(补码) 
// 异或 00、11 -> 0；01、10 -> 1
// 左移，会保留它操作数值的符号
// 按位与或非、异或 逻辑与或非 布尔操作符
// 逻辑与操作符是一种短路操作符
// 乘性操作符：乘法、除法、取模