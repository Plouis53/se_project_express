const User = require("../models/user");

// Get all users
const getUsers = (req, res) => {
  try {
    const users = User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

// Get user by ID
const getUser = (req, res) => {
  const { userId } = req.params;
  try {
    const user = User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};

// Create a new user
const createUser = (req, res) => {
  const { name, avatar } = req.body;
  try {
    const newUser = new User({ name, avatar });
    const savedUser = newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
};
