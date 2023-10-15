const url = require("./logo.png");

console.log("source url", url);

const image = new Image();

image.src = url;

document.body.appendChild(image);
