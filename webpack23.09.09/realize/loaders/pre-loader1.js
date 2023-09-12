function loader(source) {
  console.log("pre-loader1")
  return source + "// pre-loader1"
}

module.exports = loader