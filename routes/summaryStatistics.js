const router = require("express").Router();

const {
  getSummaryStatisticsAll,
  getSummaryStatisticsOnContract,
  getSummaryStatisticsByDepartment,
  getSummaryStatisticsByDepartmentAndSubDepartment,
} = require("../controllers/summaryStatistics");

const { verifyToken } = require("../middlwares/auth");

/**
 * @swagger
 * /statistics:
 *   get:
 *     summary: Get summary statistics for salary across all departments and sub-departments.
 *     description: Retrieve mean, min, and max salary for each department and sub-department combination.
 *     tags:
 *       - Statistics
 *     security:
 *       - BearerAuth: 'Bearer ey...'
 *     responses:
 *       '200':
 *         description: Successful response with summary statistics.
 *         content:
 *           application/json:
 *             example:
 *               - department: "Administration"
 *                 subDepartment: "Agriculture"
 *                 meanSalary: 30
 *                 minSalary: 30
 *                 maxSalary: 30
 *       '401':
 *         description: Unauthorized. User must provide a valid token.
 *       '500':
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.get("/all", verifyToken, getSummaryStatisticsAll);

/**
 * @swagger
 * /on-contract:
 *   get:
 *     summary: Get summary statistics for salary for employees on contract.
 *     description: Retrieve mean, min, and max salary for employees on contract.
 *     tags:
 *       - Statistics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response with summary statistics.
 *         content:
 *           application/json:
 *             example:
 *               meanSalary: 50
 *               minSalary: 40
 *               maxSalary: 60
 *       '401':
 *         description: Unauthorized. User must provide a valid token.
 *       '500':
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.get("/on-contract", verifyToken, getSummaryStatisticsOnContract);

/**
 * @swagger
 * /department:
 *   get:
 *     summary: Get summary statistics for salary for each department.
 *     description: Retrieve mean, min, and max salary for each department.
 *     tags:
 *       - Statistics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response with summary statistics for each department.
 *         content:
 *           application/json:
 *             example:
 *               - department: "Engineering"
 *                 meanSalary: 75000
 *                 minSalary: 60000
 *                 maxSalary: 90000
 *               - department: "Administration"
 *                 meanSalary: 30000
 *                 minSalary: 30000
 *                 maxSalary: 30000
 *       '401':
 *         description: Unauthorized. User must provide a valid Bearer token (e.g., Bearer ey...).
 *       '500':
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.get("/department", verifyToken, getSummaryStatisticsByDepartment);

/**
 * @swagger
 * /dept-sub-dept:
 *   get:
 *     summary: Get summary statistics for salary for each department and sub-department combination.
 *     description: Retrieve mean, min, and max salary for each department and sub-department combination.
 *     tags:
 *       - Statistics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful response with summary statistics for each department and sub-department.
 *         content:
 *           application/json:
 *             example:
 *               - department: "Engineering"
 *                 subDepartment: "Platform"
 *                 meanSalary: 75000
 *                 minSalary: 60000
 *                 maxSalary: 90000
 *               - department: "Administration"
 *                 subDepartment: "Agriculture"
 *                 meanSalary: 30000
 *                 minSalary: 30000
 *                 maxSalary: 30000
 *       '401':
 *         description: Unauthorized. User must provide a valid Bearer token (e.g., Bearer ey...).
 *       '500':
 *         description: Internal Server Error. Something went wrong on the server.
 */
router.get(
  "/sub-department",
  verifyToken,
  getSummaryStatisticsByDepartmentAndSubDepartment
);

module.exports = router;
