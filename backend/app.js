const express = require("express");
const bodyParser = require("body-parser");
const res = require("express/lib/response");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log("listening on 3000");
});
app.post("/form", (req, res) => {
  res.send(req.body);
});
