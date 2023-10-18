const sqlite3 = require("sqlite3").verbose();

let db = undefined;

async function initDb() {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database("employees.db", (err) => {
      if (err) {
        console.error("Error opening database", err.message);
        reject(err);
      } else {
        console.log("Connected to the employees database");
        resolve();
      }
    });

    db.run(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY, 
        name TEXT,
        salary INTEGER,
        currency TEXT,
        department TEXT,
        sub_department TEXT,
        on_contract TEXT
      )
    `);

    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        username TEXT,
        password TEXT
      )
    `);
  });
}

module.exports = {
  initDb,
  db,
};
