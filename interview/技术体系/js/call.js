let bar = {
  name: "johnny",
};
function foo(m, n) {
  console.log(this.name, m, n);
}
foo.call(bar, 1, 2); // johnny

Function.prototype.myCall = function (context, ...args) {
  const newThis = context || window;
  if (this === Function.prototype) {
    // 不能直接调用 Function.prototype.myCall
    return undefined;
  }
  const fn = Symbol();
  newThis[fn] = this;
  const result = newThis[fn](...args);
  delete newThis[fn];
  return result;
};

foo.myCall(bar, 1, 2); // johnny

foo.apply(bar, [1]);

Function.prototype.myApply = function (context, args) {
  const newThis = context || window;
  if (this === Function.prototype) {
    return undefined;
  }
  const fn = Symbol();
  newThis[fn] = this;
  let result;
  if (Array.isArray(args)) {
    result = newThis[fn](...args);
  } else {
    result = newThis[fn]();
  }
  delete newThis[fn];
  return result;
};

foo.myApply(bar, [1, 2]);

Function.prototype.myBind = function (context, ...args) {
  if (this === Function.prototype) {
    throw new TypeError("Error");
  }
  const _this = this;
  return function F(...args2) {
    if (this instanceof F) {
      return new _this(...args, args2);
    }
    return _this.apply(context, args.concat(args2));
  };
};

console.log("----");

// 返回一个函数
let bindBar = foo.myBind(bar, 28);

bindBar("sleep"); // johnny 28 sleep

// 测试构造函数时使用
function Person(name, age) {
  // this.name = name;
  this.age = age;
  console.log("---", this.name, name, age);
}
Person.prototype.sayName = function () {
  console.log("my name is " + this.name);
};
let emptyObj = { name: "12233" };
var FakerPerson = Person.myBind(emptyObj);

var johnny = FakerPerson("johnny", 28);
// johnny(); // my name is johnny
