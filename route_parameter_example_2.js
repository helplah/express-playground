const express = require("express");
const app = express();

app.param("userId", function(req, res, next, userId) {
  // do whatever you like with the userId, e.g. looking up the user profile in database
  const users = {
    1: "David",
    2: "Abdullah",
    3: "Batya"
  };

  const user = { userId, userName: users[userId] };

  // and you can set new information in the request object
  req.user = user;

  // now let the next handler to process the request
  next();
});

app.param("bookId", function(req, res, next, bookId) {
  const books = {
    1: "Bible",
    2: "Quran",
    3: "Torah"
  };

  const book = books[bookId];
  req.book = book;
  next();
});

app.get("/users/:userId/books/:bookId", function(req, res) {
  const user = req.user;
  const book = req.book;
  res.send("Got the request for user " + user.userName + " for the " + book);
});

const server = app.listen(3000, function() {
  console.log("Application started....");
});
