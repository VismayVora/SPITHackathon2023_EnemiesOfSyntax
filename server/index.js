const express = require("express");
const router = require("./routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
app.use(bodyParser.json());
app.use(cors("*"));
app.listen(3001, () => {
  console.log("Hello");
});

app.get("/", (req, res, next) => {
  res.json(["Hello"]);
});

app.use("/api", router);
