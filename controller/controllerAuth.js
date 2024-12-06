const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../data/db");

// Register a new user
const register = async (req, res) => {
  try {
    const { user_name, user_password, user_role_id } = req.body;
    const hashedPassword = await bcrypt.hash(user_password, 10);
    await db.query(
      "INSERT INTO users (user_name, user_password, user_role_id) VALUES (?, ?, ?)",
      [user_name, hashedPassword, user_role_id]
    );
    res.status(201).json({ message: "User created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Login a user
const login = async (req, res) => {
  try {
    const { user_name, user_password } = req.body;
    const [user] = await db.query("SELECT * FROM users WHERE user_name = ?", [
      user_name,
    ]);
    if (user.length === 0) {
      return res.status(400).json({ message: "Invalid credentials name" });
    }
    const isPasswordValid = await bcrypt.compare(
      user_password,
      user[0].user_password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials password" });
    }
    const token = jwt.sign(
      {
        user_id: user[0].user_id,
        user_name: user[0].user_name,
        user_role_id: user[0].user_role_id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { register, login };
