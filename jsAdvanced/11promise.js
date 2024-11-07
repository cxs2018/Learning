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
  setTimeout(reject, 1000, "bar");
}
function foo() {
  new Promise(fooPromiseExecutor);
}
foo();

// ES6 期约 ES8 异步函数
// 序列化、连锁使用、复合、扩展、重组
{
  // async、await
  async function foo() {
    console.log(2);
    await null;
    console.log(4);
  }
  console.log(1);
  foo();
  console.log(3);
  /**
   * 1. 打印1
   * 2. 调用异步函数foo()
   * 3. （在foo()中）打印2
   * 4. （在foo()中）await关键字暂停执行，为立即可用的值null向消息队列中添加一个任务
   * 5. foo()退出
   * 6. 打印3
   * 7. 同步线程的代码执行完毕
   * 8. JavaScript运行时从消息队列中取出任务，恢复异步函数执行
   * 9. （在foo()中）恢复执行，await 取得null值（这里并没有使用）
   * 10. （在foo()中）打印4
   * 11. foo()返回
   */
}
{
  console.log("await promise");
  // 如果await后面是一个期约，为了执行异步函数，实际上会有两个任务添加到消息队列并被异步求值
  async function foo() {
    console.log(2);
    console.log(await Promise.resolve(8));
    console.log(9);
  }
  async function bar() {
    console.log(4);
    console.log(await 6);
    console.log(7);
  }
  console.log(1);
  foo();
  console.log(3);
  bar();
  console.log(5);
  /**
   * 消息队列  8 9 6 7
   */
}
