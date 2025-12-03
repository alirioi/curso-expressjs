require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <h1>Curso de Express.js</h1>
    <p>Esto es una aplicación Node.js con Express.js.</p>
    <p>Corre en el puerto ${PORT}</p>
    `);
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`User ID requested: ${userId}`);
});

app.get("/search", (req, res) => {
  const terms = req.query.terms || "No terms provided";
  const category = req.query.category || "all";

  res.send(`<h2>Search Results:</h2>
            <p>Terms: ${terms}</p>
            <p>Category: ${category}</p>`);
});

app.post("/form", (req, res) => {
  const name = req.body.name || "Guest";
  const email = req.body.email || "No email provided";
  res.json({ message: `Form submitted successfully`, data: { name, email } });
});

app.post("/api/data", (req, res) => {
  const data = req.body;

  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: "No data provided" });
  }

  res.status(201).json({ message: "Data received successfully", data });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
