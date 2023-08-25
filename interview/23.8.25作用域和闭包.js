var i;
for (i = 0; i < 10; i++) {
  let j = i;
  setTimeout(() => {
    console.log(j)
  }, 1000)
}
// console.log(i); // ReferenceError

var a = 3

foo();

function foo() {
  var a = 1
  console.log(a); // undefined
}

// 变量和函数声明会被提升
foo(); // TypeError
bar(); // ReferenceError
var foo = function bar() {
  // ...
};