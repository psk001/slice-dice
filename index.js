require("dotenv").config();

const app = require("express")();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());

const { initDb } = require("./dbConfig");

initDb();

const authRoutes = require("./routes/auth");
const employeeRoutes = require("./routes/employees");
const summaryStatisticsRoutes = require("./routes/summaryStatistics");

app.use('/auth', authRoutes)
app.use("/employee", employeeRoutes);
app.use("/summary-statistics", summaryStatisticsRoutes);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
