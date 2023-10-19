function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
  return { name: 5 };
}

debugger;
// 请写出以下输出结果：
// Foo.getName(); // 2
// getName(); // 4
// Foo().getName(); // 1 Foo 内部的getName没有用var修饰，会给全局变量 getName 赋值
// getName(); // 1
// new Foo.getName(); // 2
// new Foo().getName(); // 3
// new new Foo().getName(); // 3

/**
 * new 运算符的优先级
 * new带参数，如 new Foo()、new Foo(1,2)，带参数是指后面有括号可以传递参数 和 . 属性访问运算符优先级一样，从左往后运算
 * new 不带参数，如 new Foo，优先级比 . 属性访问低
 * new new 从右往左执行
 */

function Car() {}
car1 = new Car();
car2 = new Car();

console.log(car1.color); // undefined

Car.prototype.color = { a: "A" };
console.log(car1.color); // original color

car1.color.B = "B";
console.log(car1.color); // black

console.log(car1.__proto__.color); //original color
console.log(car2.__proto__.color); //original color
console.log(car1.color); // black
console.log(car2.color); // original color
