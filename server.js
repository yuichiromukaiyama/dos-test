const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const app = express();
var cors = require("cors");

app.use(cors());

const json = JSON.parse(fs.readFileSync("./config.json").toString());

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public", "index.html"));
});

let count = 0;

app.get("/dos", (req, res) => {
  count++;
  console.log("start", count);
  let hash = "";

  for (let i = 0; i < 2000000; i++) {
    hash += (() => crypto.randomBytes(120).toString("hex"))();
  }
  res.type("application/json").status(200).send({ message: "OK" });
});

app.listen(json.port, () => {
  console.log(`Start Application http://localhost:${json.port}`);
});
