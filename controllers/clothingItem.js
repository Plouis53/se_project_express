const ClothingItem = require("../models/clothingItem");
const { BadRequestError } = require("../errors/bad-request-error");
const { NotFoundError } = require("../errors/not-found-error");
const { ForbiddenError } = require("../errors/forbidden-error");

// const {
//   handleOnFailError,
//   handleErrorResponse,
//   errorStatusCodes,
// } = require("../utils/errors");

// 7/10/23const createItem = (req, res) => {
//   const { name, weather, imageUrl } = req.body;

//   ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
//     .then((item) => {
//       res.send({ data: item });
//     })
//     .catch((err) => {
//       handleErrorResponse(err, res);
//     });
// };

const createItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((item) => {
      res.send({ data: item });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Bad request, invalid data"));
      } else {
        next(err);
      }
    });
};

const getItems = (req, res, next) => {
  ClothingItem.find()
    .sort({ createdAt: -1 })
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => {
      next(err);
    });
};

const updateItem = (req, res, next) => {
  const { itemId } = req.params;
  const { imageUrl } = req.body;

  ClothingItem.findOneAndUpdate({ _id: itemId }, { $set: { imageUrl } })
    .then((item) => {
      if (!item) {
        next(new NotFoundError("Item not found"));
        return;
      }
      res.status(200).send({ data: item });
    })
    .catch((err) => {
      next(err);
    });
};

const deleteItem = (req, res, next) => {
  const { itemId } = req.params;

  ClothingItem.findById(itemId)
    .then((item) => {
      if (!item) {
        next(new NotFoundError("Item not found"));
        return;
      }
      if (String(item.owner) !== req.user._id) {
        next(new ForbiddenError("You are not authorized to delete this item"));
        return;
      }

      item.deleteOne().then(() => {
        res.send({ message: "Item deleted" });
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
      } else {
        next(err);
      }
    });
};
//     .catch((err) => {
//       if (err.statusCode === errorStatusCodes.notFound) {
//         res
//           .status(errorStatusCodes.notFound)
//           .send({ message: "Item not found" });
//       } else if (err.name === "CastError") {
//         res
//           .status(errorStatusCodes.badRequest)
//           .send({ message: "Bad Request and/or invalid input" });
//       } else {
//         res
//           .status(errorStatusCodes.internalServerError)
//           .send({ message: "Something went wrong" });
//       }
//     });
// };

const likeItem = (req, res, next) => {
  // const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        next(new NotFoundError("Item not found"));
      } else {
        res.status(200).send({ data: { ...item.toObject() } });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Bad request, invalid data ID"));
      } else {
        next(err);
      }
    });
  // .orFail(handleOnFailError)
  // .then((updatedClothingItem) => {
  //   res.send(updatedClothingItem);
  // })
  // .catch((err) => {
  //   handleErrorResponse(err, res);
  // });
};

const disLikeItem = (req, res, next) => {
  // const { itemId } = req.params;
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .then((item) => {
      if (!item) {
        next(new NotFoundError("Item not found"));
      } else {
        res.status(200).send({ data: { ...item.toObject() } });
      }
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Bad request, invalid data ID"));
      } else {
        next(err);
      }
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
