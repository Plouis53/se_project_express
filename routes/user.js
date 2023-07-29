const router = require("express").Router();
const { authorization } = require("../middlewares/auth");
const { validateUpdateNameAndAvatar } = require("../middlewares/validation");

const { getCurrentUser, updateCurrentUser } = require("../controllers/user");

router.get("/me", authorization, getCurrentUser);

// UPDATE
router.patch(
  "/me",
  authorization,
  validateUpdateNameAndAvatar,
  updateCurrentUser
);

module.exports = router;
