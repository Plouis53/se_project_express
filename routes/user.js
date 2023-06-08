const router = require("express").Router();
const {authorization} = require("../middlewares/auth");

const {
  // getUser,
  // getUsers,
  // createUser,
  getCurrentUser,
  updateCurrentUser,
} = require("../controllers/user");

// CRUDE

// POST / - Create a new user
// router.post("/", createUser);

// GET / - Get all users
// router.get("/", getUsers);
// GET /- Get user by ID
// router.get("/:userId", getUser);
router.get("/me", authorization, getCurrentUser);

// UPDATE
router.patch("/me", authorization, updateCurrentUser);

module.exports = router;
