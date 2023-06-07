const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  handleOnFailError,
  handleErrorResponse,
  errorStatusCodes,
} = require("../utils/errors");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ name, avatar, email, password: hash })
        .then((user) => {
          const userData = user.toObject();
          delete userData.password;
          return res.status(201).send({ data: userData });
        })
        .catch((err) => handleErrorResponse(err, res));
    })
    .catch((err) => {
      handleErrorResponse(err, res);
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(() => {
      return handleOnFailError();
    })
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      handleErrorResponse(err, res);
    });
};

const updateCurrentUser = (req, res) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => {
      return handleOnFailError();
    })
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      handleErrorResponse(err, res);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(errorStatusCodes.unauthorized)
      .send({ message: "You are not authorized to do this" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      });
    })
    .catch((err) => {
      console.log(err);
      console.log(err.name);
      handleErrorResponse(err, res);
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  updateCurrentUser,
  login,
};


// function handleCatchMethod(res, err) {
//   if (err.name === "ValidationError") {
//     return res.status(ERROR_400).send({
//       message:
//         "Invalid data passed to the methods for creating a user or invalid ID passed to the params.",
//     });
//   }
//   return res
//     .status(ERROR_500)
//     .send({ message: "An error has occurred on the server." });
// }

// const User = require("../models/user");
// const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");

// function handleCatchMethod(res, err) {
//   if (err.name === "ValidationError") {
//     return res.status(ERROR_400).send({
//       message:
//         "Invalid data passed to the methods for creating a user or invalid ID passed to the params.",
//     });
//   }
//   if (err.name === "CastError") {
//     return res.status(ERROR_400).send({
//       message:
//         "Invalid ID passed to the params. There is no user with the requested id, or the request was sent to a non-existent address.",
//     });
//   }
//   return res
//     .status(ERROR_500)
//     .send({ message: "An error has occurred on the server." });
// }

// const getUsers = (req, res) => {
//   User.find({})
//     .then((users) => res.send(users))
//     .catch((err) => {
//       handleCatchMethod(res, err);
//     });
// };

// const getUser = (req, res) => {
//   const { userId } = req.params;

//   User.findById(userId)
//     .orFail()
//     .then((user) => res.send({ data: user }))
//     .catch((err) => {
//       if (err.name === "DocumentNotFoundError") {
//         return res.status(ERROR_404).send({
//           message:
//             "There is no user with the requested id, or the request was sent to a non-existent address.",
//         });
//       }
//       if (err.name === "CastError") {
//         return res.status(ERROR_400).send({
//           message:
//             "Invalid data passed to the methods for creating a user or invalid ID passed to the params.",
//         });
//       }
//       return res
//         .status(ERROR_500)
//         .send({ message: "An error has occurred on the server." });
//     });
// };

// const createUser = (req, res) => {
//   const { name, avatar } = req.body;

//   User.create({ name, avatar })
//     .then((user) => {
//       res.send({ data: user });
//     })
//     .catch((err) => {
//       handleCatchMethod(res, err);
//     });
// };

// module.exports = {
//   getUser,
//   getUsers,
//   createUser,
// };
