let less = require("less");

function loader(source) {
  console.log("less-loader:", source, this.resource);
  let callback = this.async();
  less.render(source, { filename: this.resource }, (err, output) => {
    console.log("less handle result: ", output);
    callback(err, "module.exports = " + JSON.stringify(output.css));
  });
}

module.exports = loader;
