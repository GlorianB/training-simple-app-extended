const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("todos.db", (err) => {
  if (err) return console.error(err);
  console.log("Connected successfully");
});

const sql = `CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key VARCHAR(255),
    name VARCHAR(255))`;

db.run(sql, (err) => {
  if (err) return console.error(err);
  console.log("Created successfully");
});

db.close();
