function loader(source) {
  console.log("post-loader1")
  return source + "// post-loader1"
}

module.exports = loader