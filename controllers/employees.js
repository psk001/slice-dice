// const { db } = require("../dbConfig");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("employees.db");

const asyncHandler = require("../utils/asyncHandler");

const getAll = asyncHandler(async (req, res) => {
  console.log("db", db);
  db.all("SELECT * FROM employees", (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }

    console.log(rows);
    res.send(rows);
  });
});

const addEmployee = asyncHandler(async (req, res) => {
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
});

const deleteEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.query;

  db.run(`DELETE FROM employees WHERE ID = ?`, employeeId, function (err) {
    if (err) {
      console.error("Error deleting employee:", err.message);
      return res.status(500).send({ error: "Internal Server Error" });
    }

    if (this.changes === 0) {
      return res.status(404).send({
        success: false,
        error: "Employee not found",
      });
    }

    return res.send({
      success: true,
      message: "Employee deleted successfully",
      employeeId,
    });
  });
});

module.exports = {
  getAll,
  addEmployee,
  deleteEmployee,
};
