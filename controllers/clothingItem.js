const ClothingItem = require("../models/clothingItem");
const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

function handleCatchMethod(res, err) {
  if (err.name === "ValidationError" || err.name === "AssertionError") {
    return res.status(ERROR_400).send({
      message:
        "Invalid data passed to the methods for creating an item/user or invalid ID passed to the params.",
    });
  }
  if (err.statusCode === 404) {
    return res.status(ERROR_404).send({
      message:
        "There is no clothing item with the requested id, or the request was sent to a non-existent address.",
    });
  }
  return res
    .status(ERROR_500)
    .send({ message: "An error has occurred on the server.", err });
}

const getItems = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => {
      const error = new Error("Item ID not found");
      error.statusCode = 404;
      throw error; // Remember to throw an error so .catch handles it instead of .then
    })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleCatchMethod(res, err);
    });
};

const createItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleCatchMethod(res, err);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndDelete(itemId)
    .then((item) => {
      if (!item) {
        return res.status(ERROR_404).send({
          message: "There is no clothing item with the requested id.",
        });
      }
      res.send({ data: item });
    })
    .catch((err) => {
      handleCatchMethod(res, err);
    });
};

module.exports = {
  getItems,
  createItem,
  deleteItem,
};

