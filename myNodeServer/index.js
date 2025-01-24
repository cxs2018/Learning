const express = require("express");

const ConversionCycleMockData = require("./ConversionCycleMockData");

const hostname = "localhost";
const port = 3000;

const app = express();
app.get("/conversion_cycle", (req, res) => {
  console.log("express get request");
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Max-Age", "1800");
  // res.setHeader("Access-Control-Allow-Headers", "content-type");
  // res.setHeader(
  //   "Access-Control-Allow-Methods",
  //   "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  // );
  // // res.setHeader("Content-Type", "application/json;charset=utf-8"); // Opening this comment will cause problems
  res.send(ConversionCycleMockData);
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
