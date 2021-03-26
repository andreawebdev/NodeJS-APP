const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
let ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home");
});

app.post("/", function (req, res) {
  const participants = req.body.participants;

  const url =
    "https://www.boredapi.com/api/activity?participiants=" + participants;

  https.get(url, function (response) {
    response.on("data", function (data) {
      const JavaScriptNature = JSON.parse(data);
      var activity = JavaScriptNature.activity;
      var type = JavaScriptNature.type;

      res.render("random", {
        activity_suggested: activity,
        type_suggested: type,
      });
    });
  });
});
app.listen(3000, function () {
  console.log("Server started on port 3000.");
});
