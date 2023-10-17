const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("employees.db");

const getSummaryStatisticsAll = async (req, res) => {
  try {
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

        return res.json({
          meanSalary: row.mean_salary,
          minSalary: row.min_salary,
          maxSalary: row.max_salary,
        });
      }
    );
  } catch (error) {
    console.error("Error in getSummaryStatisticsAll:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSummaryStatisticsOnContract = async (req, res) => {
  try {
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

        return res.json({
          meanSalary: row.mean_salary,
          minSalary: row.min_salary,
          maxSalary: row.max_salary,
        });
      }
    );
  } catch (error) {
    console.error("Error in getSummaryStatisticsOnContract:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSummaryStatisticsByDepartment = async (req, res) => {
  try {
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
          meanSalary: row.mean_salary,
          minSalary: row.min_salary,
          maxSalary: row.max_salary,
        }));

        return res.json(result);
      }
    );
  } catch (error) {
    console.error("Error in getSummaryStatisticsByDepartment:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSummaryStatisticsByDepartmentAndSubDepartment = async (req, res) => {
  try {
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
          meanSalary: row.mean_salary,
          minSalary: row.min_salary,
          maxSalary: row.max_salary,
        }));

        return res.json(result);
      }
    );
  } catch (error) {
    console.error(
      "Error in getSummaryStatisticsByDepartmentAndSubDepartment:",
      error
    );
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getSummaryStatisticsAll,
  getSummaryStatisticsOnContract,
  getSummaryStatisticsByDepartment,
  getSummaryStatisticsByDepartmentAndSubDepartment,
};
