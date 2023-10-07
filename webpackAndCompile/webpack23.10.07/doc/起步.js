// 1. Symbol.toStringTag
console.log(Object.prototype.toString.call("zhufeng"));
console.log(Object.prototype.toString.call(1));
console.log(Object.prototype.toString.call([]));
console.log(Object.prototype.toString.call(Symbol("cxs")));
console.log(Object.prototype.toString.call(null));
console.log(Object.prototype.toString.call(undefined));
console.log(Object.prototype.toString.call({}));
console.log(Object.prototype.toString.call(function () {}));

/**
 * [object String]
 * [object Number]
 * [object Array]
 * [object Symbol]
 * [object Null]
 * [object Undefined]
 * [object Object]
 * [object Function]
 * 第二个单词大写开头
 */

// 自定义对象类型
const value = { value: "I'm a esModule" };
// Object.defineProperty(value, Symbol.toStringTag, {
//   value: "_esModule",
// });
value[Symbol.toStringTag] = "_esModule";
console.log(Object.prototype.toString.call(value));

// 2. create
const n1 = {};
console.log(n1, Object.getPrototypeOf(n1));
const n2 = Object.create(null);
console.log("n2", n2, Object.getPrototypeOf(n2));

Object.create = function (proto) {
  function F() {}
  F.prototype = proto;
  return new F();
};
/**
 * why?
 * 1. 更纯净的对象，for in 循环不会遍历到非自身属性（因为原型是null）
 * 2. 相比es6的 Map 兼容性更好
 */

// 3. Object.defineProperty
const obj = {};
let ageValue = 20;
Object.defineProperty(obj, "age", {
  // value: 20,
  // writable: true, // 表示可以修改value值
  get() {
    return ageValue;
  },
  set(newValue) {
    ageValue += newValue;
  },
  enumerable: true, // 对整个对象来说的，直接打印 obj.key 还是会出来，如果为false，在打印或者遍历整个对象时，不会显示这个key
  configurable: false, // 非严格模式下删除属性会静默失败，严格模式下会报错
});
obj.age = 40;
for (const key in obj) {
  console.log("key", key, obj[key]);
}
delete obj.age;
console.log(obj.age);

// 位操作
const a = 0b0100; // 二进制
const b = 0o66; // 0o、0 8进制
const c = 0xab; // 十六进制
console.log(a, b, c);
