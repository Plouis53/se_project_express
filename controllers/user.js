const User = require("../models/user");
const bcrypt = require("bcrypt");
const { ERROR_400, ERROR_404, ERROR_500 } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");
const { ERROR_401 } = require("../utils/errors");

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

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .then((user) => {
      if (!user) {
        return res.status(ERROR_404).json({ error: "User not found" });
      }
      res.json(user);
    })
    .catch((error) => {
      res.status(ERROR_500).json({ error: "Internal server error" });
    });
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(ERROR_400).json({ error: "Email already exists" });
      }

      return bcrypt
        .hash(password, 10)
        .then((hashedPassword) => {
          const newUser = new User({
            name,
            avatar,
            email,
            password: hashedPassword,
          });

          return newUser.save();
        })
        .then((createdUser) => {
          // Generate JWT token
          const token = jwt.sign({ _id: createdUser._id }, JWT_SECRET, {
            expiresIn: "7d",
          });

          res.status(201).json({ token });
        });
      // return bcrypt
      //   .hash(password, 10)
      //   .then((hashedPassword) => {
      //     const newUser = new User({
      //       name,
      //       avatar,
      //       email,
      //       password: hashedPassword,
      //     });

      //     return newUser.save();
      //   })
      //   .then((createdUser) => {
      //     res.status(201).json(createdUser);
      //   });
    })
    .catch((err) => {
      handleCatchMethod(res, err);
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(ERROR_401).json({ error: "Invalid credentials" });
      }

      return bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(ERROR_401).json({ error: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        });

        res.json({ token });
      });
    })
    .catch((err) => {
      handleCatchMethod(res, err);
    });
};

module.exports = {
  getCurrentUser,
  createUser,
  login,
};

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
