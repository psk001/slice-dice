const { registerUser, loginUser, getAll } = require("../controllers/auth");

const router = require("express").Router();

router.get("/", getAll);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
