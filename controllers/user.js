const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../errors/unauthorized-error");
const { ConflictError } = require("../errors/conflict-error");
const { BadRequestError } = require("../errors/bad-request-error");
const { NotFoundError } = require("../errors/not-found-error");

const createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({ name, avatar, email, password: hash })
        .then((user) => {
          const userData = user.toObject();
          delete userData.password;
          return res.status(201).send({ data: userData });
        })
        .catch((err) => {
          if (err.code === 11000) {
            next(
              new ConflictError("A user with the current email already exists")
            );
          }
          if (err.name === "ValidationError") {
            next(new BadRequestError("Bad request, invalid data input"));
          }
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError("Not found"))
    .then((user) => res.status(200).send({ data: user }))
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("Bad request, invalid ID"));
      } else {
        next(err);
      }
    });
};

const updateCurrentUser = (req, res, next) => {
  const { name, avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .orFail(() => new NotFoundError("Not found"))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Bad request, invalid data"));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  // console.log("hey there");
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("hey");
    return next(new UnauthorizedError("You are not authorized to do this"));
    // return res
    //   .status(errorStatusCodes.unauthorized)
    //   .send({ message: "You are not authorized to do this" });
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      // console.log("hello");
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: "7d" }),
      });
    })
    .catch(() => {
      console.log("yep");
      next(new UnauthorizedError("Incorrect email or password"));
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  updateCurrentUser,
  login,
};
