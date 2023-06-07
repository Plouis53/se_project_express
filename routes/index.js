const router = require("express").Router();
const User = require("./user");
const clothingItem = require("./clothingitem");
const { errorStatusCodes } = require("../utils/errors");

const { login, createUser } = require("../controllers/user");

router.use("/items", clothingItem);
router.use("/users", User);

router.post("/signin", login);
router.post("/signup", createUser);

router.use((req, res) => {
  res.status(errorStatusCodes.notFound).send({
    message:
      "There is NO API with the requested path, or the request was sent to a non-existent address",
  });
});

module.exports = router;
