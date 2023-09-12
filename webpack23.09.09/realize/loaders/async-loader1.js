function loader(source) {
  console.log("async-loader1")
  let callback = this.async();
  console.log(new Date())
  setTimeout(() => {
    callback(null, source + "//async1")
  }, 3000)
}

loader.pitch = function () {
  console.log("async-pitch1")
}

module.exports = loader