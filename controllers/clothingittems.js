const req = require("express/lib/request");
const ClothingItem = require("../models/clothingitem");
const res = require("express/lib/response");
const clothingitem = require("../models/clothingitem");
const e = require("express");

const createItem = (req, res) => {
  console.log(req);
  console.log(req.body);

  const { name, weather, imageUrl } = req.body;
  clothingitem
    .create({ name, weather, imageUrl })
    .then((item) => {
      console.log(item);
      res.send({ data: item });
    })
    .catch((e) => {
      res.status(500).send({ message: "Error from createItem", e });
    });
};
module.exports = {
  createItem,
};
