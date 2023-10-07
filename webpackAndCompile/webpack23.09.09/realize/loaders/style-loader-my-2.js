const path = require("path");
const { stringifyRequest } = require("loader-utils");

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
  console.log(
    "style-loader: ",
    remainingRequest,
    this.resource,
    stringifyRequest(this, "!!" + remainingRequest)
  );
  let script = `let style = document.createElement("style")
  style.innerHTML = require(${stringifyRequest(this, "!!" + remainingRequest)})
  document.head.appendChild(style)`;
  console.log("script: ", script);
  return script;
};

module.exports = loader;
