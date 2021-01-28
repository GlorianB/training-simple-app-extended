require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./core/database");

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/todos", (request, response, next) => {
  db.all("SELECT key, name FROM todos", (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ error: "Server internal error" });
    }
    response.status(200).json(data);
  });
});

app.get("/todos/:key", (request, response, next) => {
  const { key } = request.params;
  db.get(`SELECT key, name FROM todos WHERE key = ?`, [key], (err, data) => {
    if (err) {
      console.error(err);
      response.status(500).json({ error: "Server internal error" });
    }
    response.status(200).json(data);
  });
});

app.post("/todos", (request, response, next) => {
  const { key, name } = request.body;
  db.run("INSERT INTO todos(key, name) VALUES (?, ?)", [key, name], (err) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ error: "Server internal error" });
    }
    return response.status(200).json({ result: "OK" });
  });
});

app.delete("/todos/:key", (request, response, next) => {
  const { key } = request.params;
  db.run(`DELETE FROM todos where key = ?`, [key], (err, data) => {
    if (err) {
      console.error(err);
      return response.status(500).json({ error: "Server internal error" });
    }
    return response.status(200).json({ result: "OK" });
  });
});

app.use("/", (request, response, next) => {
  response.send("<h1>Page introuvable</h1>");
});

const PORT = process.env.port | 8000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
