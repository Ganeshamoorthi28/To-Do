const express = require("express");

const bodyParser = require("body-parser");

const app = express();

let port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

let workItems = [];
let items = [];

app.get("/", function (req, res) {
  today = new Date();
  let options = {
    weekday: "long",
    // year: "numeric",
    month: "long",
    day: "numeric",
  };


  let day = today.toLocaleDateString("en-US", options);

  res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
  let item = req.body.newItem;

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
  let item = req.body.newItem;
  workItems.push(item);
  res.redirect("work");
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.listen(port, function () {
  console.log("Server Started");
});
