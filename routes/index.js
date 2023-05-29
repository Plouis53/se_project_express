const router = require("express").Router();

const clothingItem = require("../models/clothingitem");

router.use(" /items", clothingItem);

router.use((req, res) => {
  res.status(500).send({ message: "Routrer not found" });
});

module.exports = router;
