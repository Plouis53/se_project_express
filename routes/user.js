const router = require("express").Router();

const { getUser, getUsers, createUser } = require("../controllers/user");

//CRUDE// POST / - Create a new user
router.post("/", createUser);

// GET / - Get all users
router.get("/", getUsers);
// GET /- Get user by ID
router.get("/:userId", getUser);

module.exports = router;