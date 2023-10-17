// Middleware for token verification
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }

  jwt.verify(token, "your-secret-key", (err, data) => {
    if (err) {
      console.error("Error in token verification:", err);
      return res.status(401).json({ error: "Unauthorized access" });
    }

    req.user = data;
    next();
  });
};

module.exports = {
  verifyToken,
};
