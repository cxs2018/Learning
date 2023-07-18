console.log('同步代码1');

setTimeout(() => {
    console.log('setTimeout')
    Promise.resolve().then(() => {
      console.log("微任务2")
    }).finally(() => {
      console.log("promise finally")
    })
    console.log("continue")
    setTimeout(() => {
      console.log("宏任务")
    }, 1000)
}, 0)

new Promise((resolve) => {
  console.log('同步代码2')
  resolve()
}).then(() => {
    console.log('微任务1')
})

console.log('同步代码3');