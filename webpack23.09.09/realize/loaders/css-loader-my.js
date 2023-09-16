const postcss = require("postcss");
const loaderUtils = require("loader-utils");
const Tokenizer = require("css-selector-tokenizer");

// 处理 @import、url()
function loader(cssString) {
  console.log("cssString", cssString);
  const cssPlugin = (options) => {
    return (cssRoot) => {
      console.log("cssRoot", cssRoot);
      cssRoot.walkAtRules(/^import$/i, (rule) => {
        rule.remove();
        options.imports.push(rule.params.slice(1, -1));
      });
      cssRoot.walkDecls((decl) => {
        let values = Tokenizer.parseValues(decl.value);
        console.log("values", JSON.stringify(values, null, 2));
        values.nodes.forEach(function (value) {
          value.nodes.forEach((item) => {
            if (item.type === "url") {
              item.url =
                "`+require(" +
                loaderUtils.stringifyRequest(this, item.url) +
                ").default+`";
              console.log(item.url);
            }
          });
        });
        decl.value = Tokenizer.stringifyValues(values);
      });
    };
  };

  let callback = this.async();
  let options = { imports: [] };
  let pipeLine = postcss([cssPlugin(options)]);
  pipeLine.process(cssString).then((result) => {
    let importsCSS = options.imports
      .map((url) => {
        return (
          "`+require(" +
          loaderUtils.stringifyRequest(this, "!!css-loader-my!" + url) +
          ")+`"
        );
      })
      .join("\r\n");
    let output = "module.exports = `" + importsCSS + "\r\n" + result.css + "`";
    output = output.replace(/\\"/g, '"');
    console.log(output);
    callback(null, output);
  });
}

module.exports = loader;
