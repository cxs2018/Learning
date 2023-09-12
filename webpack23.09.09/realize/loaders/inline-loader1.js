function loader(source) {
  console.log("inline-loader1")
  return source + "// inline-loader1"
}

loader.pitch = function () {
  console.log("inline-pitch1")
}

loader.raw = true;

module.exports = loader