const str = require("./a.js");

// require("./index.css");

// require("./index.less");

console.log("Hello World!" + str);

const fn = () => {
  console.log("arrow function");
};

fn();

// es7
@log
class A {
  a = 1;
}

let a = new A();
console.log(a.a);

function log(target) {
  console.log("decorators", target);
}
