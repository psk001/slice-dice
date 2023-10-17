// const { db } = require("../dbConfig");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("employees.db");

const getAll = async (req, res) => {
  console.log("db", db);
  db.all("SELECT * FROM employees", (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }

    console.log(rows);
    res.json(rows);
  });
};

const addEmployee = async (req, res) => {
  const { name, salary, currency, department, sub_department, on_contract } =
    req.body;

  // Insert data into the SQLite database
  const stmt = db.prepare(`
      INSERT INTO employees (name, salary, currency, department, sub_department, on_contract)
      VALUES (?, ?, ?, ?, ?, ?)
    `);

  stmt.run(
    name,
    salary,
    currency,
    department,
    sub_department,
    on_contract || null
  );

  stmt.finalize();

  res.send("Data stored successfully.");
};

const deleteEmployee = async (req, res) => {
  const { employeeName } = req.query;
    console.log('emp ', employeeName)
  db.run(`DELETE FROM employees WHERE name = ?`, employeeName, function (err) {
    if (err) {
      console.error("Error deleting employee:", err.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (this.changes === 0) {
      return res.status(404).json({ error: "Employee not found" });
    }

    return res.json({ message: "Employee deleted successfully" });
  });
};

module.exports = {
  getAll,
  addEmployee,
  deleteEmployee
};
