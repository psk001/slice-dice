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
 *       - BearerAuth: 'ey...'
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
router.get("/", verifyToken, getSummaryStatisticsAll);

router.get("/on-contract", verifyToken, getSummaryStatisticsOnContract);

router.get("/department", verifyToken, getSummaryStatisticsByDepartment);

router.get(
  "/dept-sub-dept",
  verifyToken,
  getSummaryStatisticsByDepartmentAndSubDepartment
);

module.exports = router;
