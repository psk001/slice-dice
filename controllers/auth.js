const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("employees.db");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getAll = async (req, res) => {
  console.log("db", db);
  db.all("SELECT * FROM users", (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }

    console.log(rows);
    res.json(rows);
  });
};

const user= {
    id: 1,
    username: 'psk',
    password: '$2b$10$rXLDq34Vh0N0WdpUMen//uhgmvUROGwo7x8ozHy9svnTOnBKiQr8K'
}


const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log(hashedPassword)
    // Save the user data in the database
    const data = db.run(
      "INSERT INTO users (username, password) VALUES (?, ?)",
      username,
      hashedPassword
    );

    res.status(201).json({ message: "User registered successfully", data });
  } catch (error) {
    console.error("Error in registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Retrieve the user from the database
    // const user = await getUserByUsername(username);

    console.log(user)
    if (!user) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      "your-secret-key",
      { expiresIn: "1h" }
    );

    // Send the token in the response
    res.json({ username, token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to get user by username from the database
const getUserByUsername = (username) => {
  console.log(username);
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE username = ?", username, (err, row) => {
      if (err) {
        reject(err);
      } else {
        console.log(row);
        resolve(row);
      }
    });
  });
};

module.exports = {
  getAll,
  loginUser,
  registerUser,
};
