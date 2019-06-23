const express = require("express");
const app = express();

function requestHandler1(req, res, next) {
  //
  // res.set("Content-Type", "application/json").send({ name: "Jon", age: 30 });
  // res.json({ name: "Jon", age: 30 });

  // res.write("Here is a list of students:\n");

  // res.status(418).end();
  // res.sendStatus(418);
  next();
}

function requestHandler2(req, res, next) {
  console.log(res.write);
  res.write("Gordon\n");
  res.write("David\n");
  res.end();
}

app.get("/students", requestHandler1, requestHandler2);

const server = app.listen(3000, function() {
  console.log("Application started....");
});
