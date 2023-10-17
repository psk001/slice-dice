const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("employees.db");


const d = [
  {
    name: "Abhishek",
    salary: "145000",
    currency: "USD",
    department: "Engineering",
    sub_department: "Platform",
  },
  {
    name: "Anurag",
    salary: "90000",
    currency: "USD",
    department: "Banking",
    on_contract: "true",
    sub_department: "Loan",
  },
  {
    name: "Himani",
    salary: "240000",
    currency: "USD",
    department: "Engineering",
    sub_department: "Platform",
  },
  {
    name: "Yatendra",
    salary: "30",
    currency: "USD",
    department: "Operations",
    sub_department: "CustomerOnboarding",
  },
  {
    name: "Ragini",
    salary: "30",
    currency: "USD",
    department: "Engineering",
    sub_department: "Platform",
  },
  {
    name: "Nikhil",
    salary: "110000",
    currency: "USD",
    on_contract: "true",
    department: "Engineering",
    sub_department: "Platform",
  },
  {
    name: "Guljit",
    salary: "30",
    currency: "USD",
    department: "Administration",
    sub_department: "Agriculture",
  },
  {
    name: "Himanshu",
    salary: "70000",
    currency: "EUR",
    department: "Operations",
    sub_department: "CustomerOnboarding",
  },
  {
    name: "Anupam",
    salary: "200000000",
    currency: "INR",
    department: "Engineering",
    sub_department: "Platform",
  },
];

function initdb() {
  const db = new sqlite3.Database("employees.db");
  db.run(`
  CREATE TABLE IF NOT EXISTS employees (
    name TEXT,
    salary INTEGER,
    currency TEXT,
    department TEXT,
    sub_department TEXT,
    on_contract TEXT
  )
`);
}

function pop() {
  const stmt = db.prepare(`
    INSERT INTO employees (name, salary, currency, department, sub_department, on_contract)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  d.forEach((employee) => {
    stmt.run(
      employee.name,
      employee.salary,
      employee.currency,
      employee.department,
      employee.sub_department,
      employee.on_contract || null
    );
  });

  stmt.finalize();
}

pop();
