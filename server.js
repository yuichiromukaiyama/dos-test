const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const app = express();
var cors = require("cors");

app.use(cors());

const json = JSON.parse(fs.readFileSync("./config.json").toString());
let count = 0;

app.get("/", (req, res) => {
  count = 0;
  res.sendFile(path.resolve("public", "index.html"));
});

app.get("/dos", (req, res) => {
  count++;
  console.log("start", count);
  const bigHash = [];
  const bigArray = [];
  for (let i = 0; i < 100000; i++) {
    bigHash.push(crypto.randomBytes(120).toString("hex"));
    bigArray.push(fs.readFileSync(path.resolve("public", "sample.jpeg")));
  }

  console.log(bigHash.length, bigArray.length);

  res.type("application/json").status(200).send({ message: "OK" });
});

app.listen(json.port, () => {
  console.log(`Start Application http://localhost:${json.port}`);
});
