function loader(source) {
  console.log("normal-loader2")
  return source + "// normal-loader2"
}

module.exports = loader