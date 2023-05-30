const router = require("express").Router();

const { getUser, getUsers, createUser } = require("../controllers/user");

// GET /- Get user by ID
router.get("/:itemId", getUser);

// GET / - Get all users
router.get("/", getUsers);

// POST / - Create a new user
router.post("/", createUser);

module.exports = router;