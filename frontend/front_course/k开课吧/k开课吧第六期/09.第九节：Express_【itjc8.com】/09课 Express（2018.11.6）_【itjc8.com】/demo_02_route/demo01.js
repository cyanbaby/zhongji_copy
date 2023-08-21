const express = require("express");

let app = express();
app.listen(8080);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} ${Date.now()}`);
  next();
});

app.get("/", (req, res) => {
  console.log("我在 use 之后执行");
  res.send("index");
});

app.get("/about", (req, res) => {
  res.send("about");
});

app.get("/login", (req, res) => {
  res.send("login");
});
