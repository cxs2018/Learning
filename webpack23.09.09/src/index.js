// document.getElementById("btn").addEventListener("click", () => {
//   import(/* webpackChunkName: "title"*/ "./title").then((result) => {
//     console.log(result);
//   });
// });

// let sum = (a, b) => a + b;

// module.exports = sum;

const imageSrc = require("./image1.png");

const image = new Image();
image.src = imageSrc.default; // 对应导出的是es6 module
// image.src = imageSrc; // 对应导出的是commonjs

document.body.appendChild(image);
