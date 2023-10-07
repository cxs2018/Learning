function double(value, success, failure) {
  setTimeout(() => {
    try {
      if (typeof value !== "number") {
        throw "Must provide number as first argument";
      }
      success(2 * value);
    } catch (e) {
      failure(e);
    }
  }, 1000);
}
const successCallback = (x) => {
  double(x, (y) => console.log(`Success: ${y}`));
};
const failureCallback = (e) => console.log(`Failure: ${e}`);
double(3, successCallback, failureCallback);

// 期约连锁、期约合成

// async function foo() {
//   console.log(2);
//   console.log(await Promise.resolve(8));
//   console.log(9);
//  }
//  async function bar() { 
//   console.log(4);
//   console.log(await 6);
//   console.log(7);
//  }
//  console.log(1);
//  foo();
//  console.log(3);
//  bar();
//  console.log(5);

//  async function sleep(delay) {
//   return new Promise((resolve) => setTimeout(resolve, delay));
//  }
//  async function foo() {
//   const t0 = Date.now();
//   await sleep(1500); // 暂停约 1500 毫秒
//   console.log(Date.now() - t0);
//  }
//  foo(); 

 function fooPromiseExecutor(resolve, reject) {
  setTimeout(reject, 1000, 'bar');
 }
 function foo() {
  new Promise(fooPromiseExecutor);
 } 
 foo();

 // ES6 期约 ES8 异步函数
 // 序列化、连锁使用、复合、扩展、重组