const express = require("express");
const app = express();

app.get("/", function(req, res, next) {
  // assume some error happens
  const err = new Error("Unexpected network error");
  next(err);
});

app.get("/", function(req, res, next) {
  console.log("You should not see this line in the console.");
});

// app.get("/async", async (req, res, next) => {
//   setTimeout(() => {
//     next(new Error("something"));
//   }, 1000);
// });

app.get("/async", async (req, res, next) => {
  await Promise.resolve()
    .then(() => {
      throw new Error();
    })
    .catch(e => next(e));
});

// this doesn't work because then would run first, an error would be thrown and catch
// all of these happened before the route is called
// the request will timeout while waiting for the route to be called
app.get("/async", (req, res, next) => {
  Promise.resolve()
    .then(() => {
      throw new Error();
    })
    .catch(e => next(e));
});

// error handlers below
app.use("/", function(err, req, res, next) {
  if (err.message == "Unexpected network error") {
    console.log("I don't know how to handle network error. Pass it on.");
    next(err);
  } else {
    console.log("Unknown error. Pass it on.");
    next(err);
  }
});

app.use(function(err, req, res, next) {
  res.status(500);
  res.send({ error: "unknown error" });
});

const server = app.listen(3000, function() {
  console.log("Application started....");
});
