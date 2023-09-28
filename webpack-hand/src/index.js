let sync = require("./sync.js");
console.log("sync", sync);
import(/* webpackChunkName: 'title' */ "./title").then((result) => {
  console.log("title", result);
});

import(/* webpackChunkName: 'content' */ "./content").then((result) => {
  console.log("content", result);
});

const isArray = require("isarray");

console.log("isArray []", isArray([]));
