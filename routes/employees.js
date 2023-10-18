const {
  addEmployee,
  getAll,
  deleteEmployee,
} = require("../controllers/employees");

const { verifyCreateEmployeePayload } = require("../middlwares/employee");
const { verifyToken } = require("../middlwares/auth");

const router = require("express").Router();

router.get("/", verifyToken, getAll);

/**
 * @swagger
 * /:
 *   post:
 *     summary: Add a new employee to the database.
 *     description: Add an employee with the specified details to the database.
 *     tags:
 *       - Employees
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Employee information to be added.
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             name: "John"
 *             salary: "145000"
 *             currency: "USD"
 *             department: "Engineering"
 *             sub_department: "Platform"
 *     responses:
 *       '200':
 *         description: Data stored successfully.
 *         content:
 *           text/plain:
 *             example: Data stored successfully.
 *       '400':
 *         description: Bad Request. Indicates missing or invalid payload.
 *         content:
 *           application/json:
 *             example:
 *               error: "Missing required fields in the payload"
 *           example:
 *               error: "Invalid field types in the payload"
 *       '401':
 *         description: Unauthorized. User must provide a valid Bearer token (e.g., Bearer ey...).
 *       '500':
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.post("/", verifyToken, verifyCreateEmployeePayload, addEmployee);

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Delete an employee.
 *     description: Delete an employee with the specified name.
 *     tags:
 *       - Employees
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: employeeName
 *         schema:
 *           type: string
 *         required: true
 *         description: The name of the employee to be deleted.
 *     responses:
 *       '200':
 *         description: Employee deleted successfully.
 *         content:
 *           application/json:
 *             example:
 *               message: "Employee deleted successfully"
 *       '400':
 *         description: Bad Request. Indicates missing or invalid parameters.
 *         content:
 *           application/json:
 *             example:
 *               error: "Missing or invalid parameters"
 *       '401':
 *         description: Unauthorized. User must provide a valid Bearer token (e.g., Bearer ey...).
 *       '404':
 *         description: Not Found. Employee with the specified name not found.
 *         content:
 *           application/json:
 *             example:
 *               error: "Employee not found"
 *       '500':
 *         description: Internal Server Error. Something went wrong on the server.
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal Server Error"
 */
router.delete("/", verifyToken, deleteEmployee);

module.exports = router;
