const router = require("express").Router();
const auth = require("../middlewares/auth");

// const { getUser, getUsers, createUser } = require("../controllers/user");

const { getCurrentUser, updateCurrentUser } = require("../controllers/user");
// CRUDE
// POST / - Create a new user
//router.post("/", createUser);
// GET / - Get all users
// router.get("/", getUsers);
// GET /- Get user by ID
//router.get("/:userId", getUser);
router.get("/me", auth, getCurrentUser);

// UPDATE
router.patch("/me", auth, updateCurrentUser);

module.exports = router;
