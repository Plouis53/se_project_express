const User = require("../models/user");
const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

function handleCatchMethod(res, err) {
  if (err.name === "ValidationError") {
    return res.status(ERROR_400).send({
      message:
        "Invalid data passed to the methods for creating a user or invalid ID passed to the params.",
    });
  }
  if (err.name === "CastError") {
    return res.status(ERROR_400).send({
      message:
        "Invalid ID passed to the params. There is no user with the requested id, or the request was sent to a non-existent address.",
    });
  }
  return res
    .status(ERROR_500)
    .send({ message: "An error has occurred on the server." });
}

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      handleCatchMethod(res, err);
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        return res.status(ERROR_404).send({
          message:
            "There is no user with the requested id, or the request was sent to a non-existent address.",
        });
      }
      if (err.name === "CastError") {
        return res.status(ERROR_400).send({
          message:
            "Invalid data passed to the methods for creating a user or invalid ID passed to the params.",
        });
      }
      return res
        .status(ERROR_500)
        .send({ message: "An error has occurred on the server." });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;

  User.create({ name, avatar })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      handleCatchMethod(res, err);
    });
};

module.exports = {
  getUser,
  getUsers,
  createUser,
};
