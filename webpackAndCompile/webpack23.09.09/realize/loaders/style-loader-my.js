function loader(source) {
  console.log("style-loader: ", source);
  let script =
    `let style = document.createElement("style")
  style.innerHTML = ${JSON.stringify(source)}
  document.head.appendChild(style)
  module.exports = ""`
  return script
}

module.exports = loader