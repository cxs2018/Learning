function loader(source) {
  console.log("post-loader2")
  return source + "// post-loader2"
}

module.exports = loader