const fs = require("fs");
const path = require("path");
const cssTree = require("css-tree");
let cssFilePath = path.join(__dirname, "input.css");

let transformPxToRem = async function (cssFilePath) {
  let cssString = fs.readFileSync(cssFilePath, "utf8");
  let cssAstTree = cssTree.parse(cssString);
  cssTree.walk(cssAstTree, function (node) {
    if (node.type == "Dimension" && node.unit == "px") {
      node.value = node.value / 75;
      node.unit = "rem";
    }
  });
  let ouputTree = cssTree.generate(cssAstTree);
  fs.writeFileSync(path.join(__dirname, "output.css"), ouputTree, function () {
    console.log("write done!");
  });
};

transformPxToRem(cssFilePath);
