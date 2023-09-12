function loader(source) {
  console.log("inline-loader11")
  return source + "// inline-loader1"
}

loader.normal = function () { }

loader.pitch = function () {

}

loader.raw = true;

module.exports = loader