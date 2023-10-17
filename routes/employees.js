const {
  addEmployee,
  getAll,
  deleteEmployee,
} = require("../controllers/employees");
const { verifyEmployeePayload } = require("../middlwares/employee");
const { verifyToken } = require("../middlwares/auth");

const router = require("express").Router();

router.get("/", verifyToken, getAll);
router.post("/", verifyToken, verifyEmployeePayload, addEmployee);
router.delete("/", verifyToken, deleteEmployee);

module.exports = router;
