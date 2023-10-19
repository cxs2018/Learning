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
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1 Foo 内部的getName没有用var修饰，会给全局变量 getName 赋值
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3
