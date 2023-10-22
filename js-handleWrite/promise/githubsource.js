/**
 * https://github.com/xieranmaya/blog/issues/3
 */
// Promise构造函数接收一个executor函数，executor函数执行完同步或异步操作后，调用它的两个参数resolve和reject
new Promise(function (resolve, reject) {
  /*
    如果操作成功，调用resolve并传入value
    如果操作失败，调用reject并传入reason
  */
});

function Promise(executor) {
  var self = this;
  self.status = "pending"; // Promise当前的状态
  self.data = undefined; // Promise的值
  self.onResolvedCallback = []; // Promise resolve时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面
  self.onRejectedCallback = []; // Promise reject时的回调函数集，因为在Promise结束之前有可能有多个回调添加到它上面

  function resolve(value) {
    // setTimeout(() => {
    if (self.status === "pending") {
      self.status = "resolved";
      self.data = value;
      for (var i = 0; i < self.onResolvedCallback.length; i++) {
        self.onResolvedCallback[i](value);
      }
    }
    // });
  }

  function reject(reason) {
    // setTimeout(() => {
    if (self.status === "pending") {
      self.status = "rejected";
      self.data = reason;
      for (var i = 0; i < self.onRejectedCallback.length; i++) {
        self.onRejectedCallback[i](reason);
      }
    }
    // });
  }

  try {
    // 执行 executor 的过程中可能会出错
    executor(resolve, reject); // 执行executor并传入相应的参数
  } catch (e) {
    reject(e);
  }
}

// then方法接收两个参数，onResolved，onRejected，分别为Promise成功或失败后的回调
Promise.prototype.then = function (onResolved, onRejected) {
  var self = this;
  var promise2;

  // 根据标准，如果then的参数不是function，则我们需要忽略它，此处以如下方式处理
  onResolved =
    typeof onResolved === "function"
      ? onResolved
      : function (value) {
          return value;
        };
  onRejected =
    typeof onRejected === "function"
      ? onRejected
      : function (reason) {
          throw reason;
        };

  if (self.status === "resolved") {
    return (promise2 = new Promise(function (resolve, reject) {
      // 如果promise1(此处即为this/self)的状态已经确定并且是resolved，我们调用onResolved
      // 因为考虑到有可能throw，所以我们将其包在try/catch块里
      try {
        var x = onResolved(self.data);
        if (x instanceof Promise) {
          x.then(resolve, reject); // 如果onResolved的返回值是一个Promise对象，直接取它的结果做为promise2的结果
        } else {
          resolve(x); // 否则，以它的返回值做为promise2的结果
        }
      } catch (e) {
        reject(e); // 如果出错，以捕获到的错误做为promise2的结果
      }
    }));
  }

  if (self.status === "rejected") {
    return (promise2 = new Promise(function (resolve, reject) {
      try {
        var x = onRejected(self.data);
        if (x instanceof Promise) {
          x.then(resolve, reject);
        } else {
          reject(x);
        }
      } catch (e) {
        reject(e);
      }
    }));
  }

  if (self.status === "pending") {
    return (promise2 = new Promise(function (resolve, reject) {
      // 如果当前的Promise还处于pending状态，我们并不能确定调用onResolved还是onRejected，
      // 只能等到Promise的状态确定后，才能确实如何处理。
      // 所以我们需要把我们的**两种情况**的处理逻辑做为callback放入promise1(此处即this/self)的回调数组里
      self.onResolvedCallback.push(function (value) {
        try {
          var x = onResolved(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          } else {
            resolve(x);
          }
        } catch (e) {
          reject(e);
        }
      });

      self.onRejectedCallback.push(function (reason) {
        try {
          var x = onRejected(self.data);
          if (x instanceof Promise) {
            x.then(resolve, reject);
          } else {
            reject(x);
          }
        } catch (e) {
          reject(e);
        }
      });
    }));
  }
};

// 为了下文方便，我们顺便实现一个catch方法
Promise.prototype.catch = function (onRejected) {
  return this.then(null, onRejected);
};

const getUserId = function () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(123);
    }, 1000);
  });
};

const getUserJobById = function (id) {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("job_" + id);
    }, 2000);
  });
};

// console.time("start");
// getUserId()
//   .then(getUserJobById)
//   .then(function (job) {
//     console.log("get job: ", job);
//     console.timeEnd("start");
//   });
//
// const promise = new Promise((resolve) => {
//   resolve("simple version");
// })
//   .then((res) => {
//     console.log("res", res);
//     return res;
//   })
//   .then((res) => {
//     console.log("res2", res);
//   });
//
new Promise((resolve) => resolve(8))
  .then()
  .catch(() => {
    console.log("执行「这个」，无论前面发生了什么");
    return 3;
  })
  .then(function (value) {
    console.log(value);
    return value + "herllo";
  })
  .then(function (value) {
    console.log(value);
  });

new Promise((resolve, reject) => {
  console.log("初始化");

  resolve();
})
  .then(() => {
    throw new Error("有哪里不对了");

    console.log("执行「这个」");
  })
  .catch((e) => {
    console.log("执行「那个」", e);
  })
  .then(
    () => {
      console.log("执行「这个」，无论前面发生了什么");
    },
    (e) => {
      console.log("last error", e);
    },
  );
