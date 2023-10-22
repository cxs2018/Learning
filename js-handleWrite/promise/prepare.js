// new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     reject("Hello world!");
//   }, 2000);
// }).then(
//   (res) => {
//     console.log("success", res);
//   },
//   (err) => {
//     console.log("fail", err);
//   },
// );

function MyPromise(callback) {
  const resolves = [];
  const rejects = [];

  const resolve = (data) => {
    resolves.forEach((resolve) => {
      resolve(data);
    });
  };

  const reject = (data) => {
    rejects.forEach((reject) => {
      reject(data);
    });
  };

  callback(resolve, reject);

  return {
    then: function (resolveCallback, rejectCallback) {
      resolves.push(resolveCallback);
      rejects.push(rejectCallback);
    },
  };
}

{
  function Promise(fn) {
    let value = null,
      state = "pending",
      callbacks = [];
    this.then = function (onFulfilled, onRejected) {
      return new Promise(function (resolve) {
        handle({
          onFulfilled: onFulfilled || null,
          onRejected: onRejected || null,
          resolve: resolve,
          reject: reject,
        });
      });
    };

    function handle(callbackObj) {
      if (state === "pending") {
        callbacks.push(callbackObj);
        return;
      }
      let cb =
          state === "fulfilled"
            ? callbackObj.onFulfilled
            : callbackObj.onRejected,
        ret;
      if (cb === null) {
        cb = state === "fulfilled" ? callbackObj.resolve : callbackObj.reject;
        cb(value);
        return;
      }

      ret = cb(value);
      callbackObj.resolve(ret);
    }

    function resolve(newValue) {
      if (
        newValue &&
        (typeof newValue === "object" || typeof newValue === "function")
      ) {
        let then = newValue.then;
        if (typeof then === "function") {
          then.call(newValue, resolve, reject);
          return;
        }
      }
      value = newValue;
      state = "fulfilled";
      // 将resolves中执行回调的逻辑放在JS任务队列末尾，保证resolve执行时，then方法的回调已经注册完成
      execute();
    }

    function reject(reason) {
      value = reason;
      state = "rejected";
      // 将resolves中执行回调的逻辑放在JS任务队列末尾，保证resolve执行时，then方法的回调已经注册完成
      execute();
    }

    function execute() {
      setTimeout(() => {
        callbacks.forEach((callback) => {
          handle(callback);
        });
      }, 0);
    }

    fn(resolve, reject);
  }

  // const promise = new Promise((resolve) => {
  //   // setTimeout(() => {
  //   resolve("simple version");
  //   // }, 1000);
  // })
  //   .then((res) => {
  //     console.log("res", res);
  //   })
  //   .then((res) => {
  //     console.log("res2", res);
  //   });
  //
  // setTimeout(() => {
  //   promise.then((res) => {
  //     console.log("res3", res);
  //   });
  // }, 2000);

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

  console.time("start");
  getUserId()
    .then(getUserJobById)
    .then(function (job) {
      console.log("get job: ", job);
      console.timeEnd("start");
    });
}
