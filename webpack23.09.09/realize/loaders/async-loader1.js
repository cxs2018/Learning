function loader(source) {
  console.log("async-loader1")
  // let callback = this.async();
  // console.log(new Date())
  // setTimeout(() => {
  //   callback(null, source + "//async1")
  // }, 3000)
}

loader.pitch = function loaderpitch1() {
  console.log("async-pitch1")
  let callback = this.async()
  callback(null)
}

module.exports = loader