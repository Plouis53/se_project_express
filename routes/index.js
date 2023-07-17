const router = require("express").Router();
const User = require("./user");
const clothingItem = require("./clothingitem");
const { login, createUser } = require("../controllers/user");
// const { errorStatusCodes } = require("../utils/errors");

const {
  validateCreatedUserInfo,
  validateLogin,
} = require("../middlewares/validation");
const { NotFoundError } = require("../errors/not-found-error");

router.post("/signin", validateLogin, login);
router.post("/signup", validateCreatedUserInfo, createUser);

//auth middleware
router.use("/items", clothingItem);
router.use("/users", User);

router.use((req, res, next) => {
  next(
    new NotFoundError(
      "There is NO API with the requested path, or the request was sent to a non-existent address"
    )
  );
  // res.status(errorStatusCodes.notFound).send({
  //   message:
  //     "There is NO API with the requested path, or the request was sent to a non-existent address",
  // });
});

module.exports = router;
