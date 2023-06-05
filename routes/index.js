const router = require("express").Router();
const User = require("./user");
const clothingItem = require("./clothingitem");
const { ERROR_404 } = require("../utils/errors");

router.use("/items", clothingItem);
router.use("/users", User);

router.use((req, res) => {
  res.status(ERROR_404).send({
    message:
      "There is NO API with the requested path, or the request was sent to a non-existent address",
  });
});

module.exports = router;


