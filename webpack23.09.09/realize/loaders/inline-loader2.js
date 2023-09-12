function loader(source) {
  console.log("inline-loader2")
  return source + "// inline-loader2"
}

module.exports = loader