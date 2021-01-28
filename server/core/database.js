require("dotenv").config();
const sqlite3 = require("sqlite3").verbose();

const DBNAME = process.env.DBPATH;

const db = new sqlite3.Database(DBNAME, (err) => {
  if (err) return console.error(err);
  console.log("Connected successfully");
});

module.exports = db;
