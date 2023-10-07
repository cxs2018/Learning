function loader(source) {
  console.log("normal-loader2")
  return source + "// normal-loader2"
}

loader.pitch = function () { // pitch意思是抛，把结果抛出去
  console.log("normal-pitch2")
  // return "normal-pitch2" // 有返回值，直接返回给 前一个loader normal，后续loader pitch、normal不再执行
}

module.exports = loader