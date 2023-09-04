let express = require("express");

let app = express();

app.get("/users", (req, res) => {
  res.json([{ id: 1, name: "hello, world" }]);
});

app.listen(4000);
