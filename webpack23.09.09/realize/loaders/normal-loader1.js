function loader(source) {
  console.log("normal-loader1")
  return source + "// normal-loader1"
}

module.exports = loader