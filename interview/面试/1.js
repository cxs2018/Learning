// console.log("a");
// setTimeout(function () {
//   console.log("b");
//   new Promise((resolve, reject) => {
//     console.log("c");
//     resolve();
//   }).then(() => {
//     console.log("d");
//   });
// });
// setTimeout(function () {
//   console.log("e");
// });
// Promise.resolve().then(function () {
//   console.log("f");
// });

async function async1() {
  console.log("a");
  await async2();
  console.log("b");
}

async function async2() {
  console.log("c");
}

console.log("d");
async1();

setTimeout(() => {
  console.log("e");
});

Promise.resolve().then(function () {
  console.log("f");
});

new Promise((resolve, reject) => {
  console.log("g");
  resolve();
}).then(() => {
  console.log("h");
});

// d a c g b f h e

