// resolve 和 join 区别
const { resolve, join } = require("path");

console.log(resolve("a", "b"));

console.log(join("a", "b"));

console.log(join(__dirname, "b"));

console.log(resolve(__dirname, "b2"));

console.log(eval("1+2+4"));
