const router = require("express").Router();
const { getUser, getUsers, createUser } = require("../controllers/user");

// Remove the following routes:
// router.post("/", createUser);
// router.get("/", getUsers);
// router.get("/:id", getUser);

// Add the updated routes:
router.post("/", createUser); // POST / - Create a new user
router.get("/", getUsers); // GET / - Get all users
router.get("/:userId", getUser); // GET /:userId - Get user by ID

module.exports = router;


// const router = require("express").Router();

// const { getUser, getUsers, createUser } = require("../controllers/user");

// // CRUDE
// // POST / - Create a new user
// router.post("/", createUser);
// // GET / - Get all users
// router.get("/", getUsers);
// // GET /- Get user by ID
// router.get("/:userId", getUser);

// module.exports = router;
