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
    .orFail(() => handleOnFailError())
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      handleErrorResponse(err, res);
    });
};

const deleteItem = (req, res) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .orFail(() => handleOnFailError())
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
    .orFail(() => handleOnFailError())
    .then(() =>
      res.status(200).send({ message: "Item has successfully been liked" })
    )
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
    .orFail(() => handleOnFailError())
    .then((item) => res.status(200).send({ data: item }))
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

// function handleRegularItemError(req, res, err) {
//   console.error(err);
//   if (err.name === "ValidationError" || err.name === "AssertionError") {
//     return res.status(ERROR_400).send({
//       message:
//         "Invalid data passed to the methods for creating an item or updating an item, or invalid ID passed to the params.",
//     });
//   }
//   if (err.name === "CastError") {
//     return res.status(ERROR_400).send({
//       message:
//         "Invalid ID passed to the params. There is no clothing item with the requested id, or the request was sent to a non-existent address.",
//     });
//   }
//   return res
//     .status(ERROR_500)
//     .send({ message: "An error has occurred on the server" });
// }

// function handleFindByIdItemError(req, res, err) {
//   if (
//     err.name === "CastError" ||
//     err.name === "ValidationError" ||
//     err.name === "AssertionError"
//   ) {
//     return res.status(ERROR_400).send({
//       message:
//         "Invalid data passed to the methods for creating an item or updating an item, or invalid ID passed to the params.",
//     });
//   }
//   if (err.name === "DocumentNotFoundError") {
//     return res.status(ERROR_404).send({
//       message:
//         "There is no clothing item with the requested id, or the request was sent to a non-existent address.",
//     });
//   }
//   return res
//     .status(ERROR_500)
//     .send({ message: "An error has occurred on the server" });
// }

// const deleteItem = (req, res) => {
//   const { itemId } = req.params;
//   console.log("HERE", req.params.itemId);

//   ClothingItem.findByIdAndDelete(itemId)
//     .orFail()
//     .then(() =>
//       res.send({ message: `The item has been successfully deleted.` })
//     )
//     .catch((err) => {
//       handleFindByIdItemError(req, res, err);
//     });
// };
