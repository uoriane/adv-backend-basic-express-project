const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

app.use(express.json());

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("Welcome to the Express.js server!");
});

app.get("/about", (req, res) => {
  res.send("This is the about page.");
});

app.get("/contact", (req, res) => {
  res.send("Contact us at contact@example.com.");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", (req, res) => {
  res.json({
    message: "User received successfully.",
    user: req.body
  });
});

app.get("/users/:id", (req, res) => {
  res.send(`User ID requested: ${req.params.id}`);
});

app.get("/search", (req, res) => {
  res.send(`Search name: ${req.query.name || ""}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
