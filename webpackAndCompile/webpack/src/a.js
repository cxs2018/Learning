// CommonJS Node语法
// module.exports = "Hello cxs!";

require("@babel/polyfill");

class B {}

function* gen(params) {
  yield 1;
}

console.log(gen().next());

"aaa".includes("a");

module.exports = B;
