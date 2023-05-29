const express = require('express');
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  createUser
} = require('../controllers/users');

// GET /users - Get all users
router.get('/users', getAllUsers);

// GET /users/:userId - Get user by ID
router.get('/users/:userId', getUserById);

// POST /users - Create a new user
router.post('/users', createUser);

module.exports = router;
