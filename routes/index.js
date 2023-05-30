const router = require("express").Router();
const User=require("./user")

const clothingItem = require("../models/clothingItem");

router.use("/items", clothingItem);
router.use("/users," User);

router.use((_req, res) => {
  res.status(500).send({ message: "Routrer not found" });
});


module.exports = router;
