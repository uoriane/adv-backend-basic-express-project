const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" },
  { id: 3, name: "Charlie" }
];

const courses = [
  { id: 1, name: "JavaScript Fundamentals" },
  { id: 2, name: "Express.js Basics" },
  { id: 3, name: "REST API Design" }
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

app.get("/courses", (req, res) => {
  res.json(courses);
});

app.get("/courses/:id", (req, res) => {
  const course = courses.find((item) => item.id === Number(req.params.id));

  if (!course) {
    return res.status(404).json({ message: "Course not found." });
  }

  res.json(course);
});

app.post("/courses", (req, res) => {
  const newCourse = {
    ...req.body,
    id: courses.length === 0 ? 1 : Math.max(...courses.map((course) => course.id)) + 1
  };

  courses.push(newCourse);
  res.status(201).json(newCourse);
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
