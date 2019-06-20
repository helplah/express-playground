const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(morgan("tiny"));

// middleware function
app.use(function(req, res, next) {
  console.log("1. common middleware function was called!");
  next();
  console.log("6. this should print last");
});

// middleware function
app.use("/users", function(req, res, next) {
  console.log("2. middleware function for /users was called!");
  next();
  console.log("5. after next from users middleware");
});

// route handlers
app.get("/users", function(req, res) {
  console.log("3. before resending response");
  res.send("Here is a list of users:....");
  console.log("4. after resending response");
});

app.get("/books", function(req, res) {
  res.send("Here is a list of books:....");
});

const server = app.listen(3000, function() {
  console.log("Application started....");
});
