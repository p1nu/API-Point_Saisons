const db = require('../data/db.js');
const bcrypt = require('bcrypt');

//Get all users
const getUsers = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//Create a new user
const createUser = async (req, res) => {
  try {
    const { user_name, user_password, user_role_id } = req.body;
    const hashedPassword = await bcrypt.hash(user_password, 10);
    await db.query('INSERT INTO users (user_name, user_password, user_role_id) VALUES (?, ?, ?)', [user_name, hashedPassword,user_role_id]);
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Get a user
const getUser = async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const [rows] = await db.query('SELECT * FROM users WHERE user_id = ?', [id]);

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Update a user
const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { user_name, user_password, user_role_id } = req.body;
    const hashedPassword = await bcrypt.hash(user_password, 10);
    await db.query('UPDATE users SET user_name = ?, user_password = ?, user_role_id = ? WHERE user_id = ?', [user_name, hashedPassword, user_role_id, id]);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//Delete a user
const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    await db.query('DELETE FROM users WHERE user_id = ?', [id]);
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser };