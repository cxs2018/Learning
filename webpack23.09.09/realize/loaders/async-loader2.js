function loader(source) {
  console.log("async-loader2")
  // let callback = this.async();
  // console.log(new Date())
  // setTimeout(() => {
  //   // 调这个函数，才会传给下一个loader执行
  //   callback(null, source + "//async2")
  // }, 3000)
}

loader.pitch = function loaderpitch2() {
  console.log("async-pitch2")
}

module.exports = loader