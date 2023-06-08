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

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userData = user.toObject();
      delete userData.password;
      res.status(201).send({ data: userData });
    })
    .catch((err) => {
      handleErrorResponse(err, res);
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail(handleOnFailError)
    .then((user) => {
      res.send({ data: user });
    })
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
    .orFail(handleOnFailError)
    .then((user) => {
      res.send(user);
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

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
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

// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const User = require("../models/user");
// const { JWT_SECRET } = require("../utils/config");
// const {
//   handleOnFailError,
//   handleErrorResponse,
//   errorStatusCodes,
// } = require("../utils/errors");

// const createUser = (req, res) => {
//   const { name, avatar, email, password } = req.body;

//   bcrypt
//     .hash(password, 10)
//     .then((hash) => {
//       return User.create({ name, avatar, email, password: hash });
//     })
//     .then((user) => {
//       const userData = user.toObject();
//       delete userData.password;
//       res.status(201).send({ data: userData });
//     })
//     .catch((err) => {
//       handleErrorResponse(err, res);
//     });
// };

// const getCurrentUser = (req, res) => {
//   User.findById(req.user._id)
//     .orFail(handleOnFailError)
//     .then((user) => {
//       res.send({ data: user });
//     })
//     .catch((err) => {
//       handleErrorResponse(err, res);
//     });
// };

// const updateCurrentUser = (req, res) => {
//   const { name, avatar } = req.body;
//   User.findByIdAndUpdate(
//     req.user._id,
//     { name, avatar },
//     { new: true, runValidators: true }
//   )
//     .orFail(handleOnFailError)
//     .then((user) => {
//       res.send(user);
//     })
//     .catch((err) => {
//       handleErrorResponse(err, res);
//     });
// };

// const login = (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res
//       .status(errorStatusCodes.unauthorized)
//       .send({ message: "You are not authorized to do this" });
//   }

//   User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
//         expiresIn: "7d",
//       });
//       res.send({ token });
//     })
//     .catch((err) => {
//       console.log(err);
//       console.log(err.name);
//       handleErrorResponse(err, res);
//     });
// };

// module.exports = {
//   createUser,
//   getCurrentUser,
//   updateCurrentUser,
//   login,
// };
