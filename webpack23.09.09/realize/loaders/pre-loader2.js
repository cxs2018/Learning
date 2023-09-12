function loader(source) {
  console.log("pre-loader2")
  return source + "// pre-loader2"
}

module.exports = loader