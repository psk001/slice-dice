const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("employees.db");
const asyncHandler = require("../utils/asyncHandler");

const getSummaryStatisticsAll = asyncHandler(async (req, res) => {
  db.get(
    "SELECT AVG(salary) as mean_salary, MIN(salary) as min_salary, MAX(salary) as max_salary FROM employees",
    (err, row) => {
      if (err) {
        console.error("Error retrieving summary statistics:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (!row) {
        return res.status(404).json({ error: "No data found" });
      }

      const { mean_salary, min_salary, max_salary } = row;

      const statistics = {
        meanSalary: `${mean_salary} USD`,
        minSalary: `${min_salary} USD`,
        maxSalary: `${max_salary} USD`,
      };

      return res.send({
        success: true,
        statistics,
      });
    }
  );
});

const getSummaryStatisticsOnContract = asyncHandler(async (req, res) => {
  db.get(
    "SELECT AVG(salary) as mean_salary, MIN(salary) as min_salary, MAX(salary) as max_salary FROM employees WHERE on_contract = 'true'",
    (err, row) => {
      if (err) {
        console.error("Error retrieving summary statistics:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (!row) {
        return res.status(404).json({ error: "No data found" });
      }

      const { mean_salary, min_salary, max_salary } = row;

      const statistics = {
        meanSalary: `${mean_salary} USD`,
        minSalary: `${min_salary} USD`,
        maxSalary: `${max_salary} USD`,
      };

      return res.send({
        success: true,
        statistics,
      });
    }
  );
});

const getSummaryStatisticsByDepartment = asyncHandler(async (req, res) => {
  db.all(
    "SELECT department, AVG(salary) as mean_salary, MIN(salary) as min_salary, MAX(salary) as max_salary FROM employees GROUP BY department",
    (err, rows) => {
      if (err) {
        console.error("Error retrieving summary statistics:", err.message);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (!rows || rows.length === 0) {
        return res.status(404).json({ error: "No data found" });
      }

      const result = rows.map((row) => ({
        department: row.department,
        meanSalary: `${row.mean_salary} USD`,
        minSalary: `${row.min_salary} USD`,
        maxSalary: `${row.max_salary} USD`,
      }));

      return res.send({
        success: true,
        statistics: result,
      });
    }
  );
});

const getSummaryStatisticsByDepartmentAndSubDepartment = asyncHandler(
  async (req, res) => {
    db.all(
      "SELECT department, sub_department, AVG(salary) as mean_salary, MIN(salary) as min_salary, MAX(salary) as max_salary FROM employees GROUP BY department, sub_department",
      (err, rows) => {
        if (err) {
          console.error("Error retrieving summary statistics:", err.message);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        if (!rows || rows.length === 0) {
          return res.status(404).json({ error: "No data found" });
        }

        const result = rows.map((row) => ({
          department: row.department,
          subDepartment: row.sub_department,
          meanSalary: `${row.mean_salary} USD`,
          minSalary: `${row.min_salary} USD`,
          maxSalary: `${row.max_salary} USD`,
        }));

        return res.send({
          success: true,
          statistics: result,
        });
      }
    );
  }
);

module.exports = {
  getSummaryStatisticsAll,
  getSummaryStatisticsOnContract,
  getSummaryStatisticsByDepartment,
  getSummaryStatisticsByDepartmentAndSubDepartment,
};
