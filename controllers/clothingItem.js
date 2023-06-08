const ClothingItem = require("../models/clothingItem");
const {
  handleOnFailError,
  handleErrorResponse,
  errorStatusCodes,
} = require("../utils/errors");

const createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleErrorResponse(err, res);
    });
};

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch((err) => {
      handleErrorResponse(err, res);
    });
};

const updateItem = (req, res) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findOneAndUpdate({ _id: itemId }, { $set: { imageUrl } })
    .orFail(handleOnFailError)
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleErrorResponse(err, res);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(handleOnFailError)
    .then((item) => {
      if (String(item.owner) !== req.user._id) {
        return res
          .status(errorStatusCodes.forbidden)
          .send({ message: "You are not authorized to delete this item" });
      }

      return item.deleteOne().then(() => {
        res.send({ message: "Item deleted" });
      });
    })
    .catch((err) => {
      if (err.statusCode === errorStatusCodes.notFound) {
        res
          .status(errorStatusCodes.notFound)
          .send({ message: "Item not found" });
      } else if (err.name === "CastError") {
        res
          .status(errorStatusCodes.badRequest)
          .send({ message: "Bad Request and/or invalid input" });
      } else {
        res
          .status(errorStatusCodes.internalServerError)
          .send({ message: "Something went wrong" });
      }
    });
};

const likeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail(handleOnFailError)
    .then(() => {
      res.send({ message: "Item has successfully been liked" });
    })
    .catch((err) => {
      handleErrorResponse(err, res);
    });
};

const disLikeItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail(handleOnFailError)
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      handleErrorResponse(err, res);
    });
};

module.exports = {
  createItem,
  getItems,
  updateItem,
  deleteItem,
  likeItem,
  disLikeItem,
};
