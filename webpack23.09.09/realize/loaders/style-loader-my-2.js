const path = require("path")

function loader(source) {
  // console.log("style-loader: ", source);
  // let script =
  //   `let style = document.createElement("style")
  // style.innerHTML = ${JSON.stringify(source)}
  // document.head.appendChild(style)
  // module.exports = ""`
  // return script
}

loader.pitch = function (remainingRequest, previousRequest, data) {
  const str = path.relative(this.context, remainingRequest)
  console.log("style-loader: ", remainingRequest, str);
  let script =
    `let style = document.createElement("style")
  style.innerHTML = require(${"!!" + str})
  document.head.appendChild(style)
  module.exports = ""`
  return script
}

module.exports = loader