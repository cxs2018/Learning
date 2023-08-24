() => {
  function Promise(fn) {
    var value = null, callbacks = [];

    this.then = function (onFulfilled) {
      callbacks.push(onFulfilled)
      return this
    }

    function resolve(value) {
      callbacks.forEach(function (callback) {
        callback(value)
      })
    }

    fn(resolve)
  }

  function getUserId() {
    return new Promise(function (resolve) {
      setTimeout(() => {
        resolve("123")
      }, 2000)
    })
  }

  getUserId().then((res) => {
    console.log('res', res)
  }).then((res) => {
    console.log("res2", res)
  })

  /**
   * 1. 调用 then 方法，将想要在 promise 异步操作成功时执行的回调放入 callbacks 队列，也就是注册回调函数，可以向观察者模式思考
   * 2. 创建 Promise 实例时传入的函数会被赋予一个函数类型的参数，即 resolve，它接收一个参数 value，代表异步操作返回的结果，当一步操作执行成功后，用户会调用 resolve 方法，Promise 内部将 callbacks 队列中的回调--执行
   */
}

() => {
  console.log("level2 start")
  function Promise(fn) {
    var value = null, callbacks = [];

    this.then = function (onFulfilled) {
      callbacks.push(onFulfilled)
      return this
    }

    function resolve(value) {
      setTimeout(() => {
        callbacks.forEach(function (callback) {
          callback(value)
        })
      }, 0)
    }

    fn(resolve)
  }

  function getUserId() {
    return new Promise(function (resolve) {
      resolve("123")
    })
  }

  getUserId().then((res) => {
    console.log('res', res)
  }).then((res) => {
    console.log("res2", res)
  })

  console.log("level2 end")

  // 问题，如果在 then 方法注册回调之前，resolve 函数就执行了
  // Promises/A+ 规范要求，回调函数需要通过异步方式执行，用以保证一致可靠的执行顺序
}

() => {
  function Promise(fn) {
    var value = null, callbacks = [], state = 'pending';

    this.then = function (onFulfilled) {
      if (state === 'pending') {
        callbacks.push(onFulfilled)
        return this
      }
      onFulfilled(value)
      return this;
    }

    function resolve(newValue) {
      value = newValue
      state = 'fulfilled'
      setTimeout(() => {
        callbacks.forEach(function (callback) {
          callback(value)
        })
      }, 0)
    }

    fn(resolve)

    // resolve 执行时，会将状态设置为 fulfilled，在此之后调用 then 添加的新回调，都会立即执行
  }
}

{
  // 链式Promise
}