const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const json = JSON.parse(fs.readFileSync("./config.json").toString());
let count = 0;

app.get("/", (req, res) => {
  count = 0;
  res.sendFile(path.resolve("public", "index.html"));
});

app.post("/dos", (req, res) => {
  const { count } = req.body;
  const bigHash = [];
  const bigArray = [];
  console.log("call", count);
  for (let i = 0; i < count; i++) {
    bigHash.push(crypto.randomBytes(120).toString("hex"));
    bigArray.push(fs.readFileSync(path.resolve("public", "sample.jpeg")));
  }

  bigHash.length, bigArray.length;
  res.type("application/json").status(200).send({ message: "OK" });
});

app.listen(json.port, () => {
  console.log(`Start Application http://localhost:${json.port}`);
});
