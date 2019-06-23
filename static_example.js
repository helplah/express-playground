const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("./static"));

app.get("/", (req, res) => {
  res.send("");
});

app.listen(PORT, () => {
  console.log(`You're listening to the smooth sounds of port ${PORT}...`);
});
