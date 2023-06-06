const mongoose = require("mongoose");
const validator = require("validator");

const user = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    minlength: [2, "Name must be at least 2 characters long"],
    maxlength: [30, "Name cannot exceed 30 characters"],
    default: "Elise Bouer", // Set default value for name field
  },
  avatar: {
    type: String,
    required: [true, "Avatar is required"],
    validate: {
      validator: (value) => validator.isURL(value),
      message: "You must enter a valid URL",
    },
    default:
      "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/wtwr-project/Elise.png", // Set default value for avatar field
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: {
      validator: (value) => validator.isEmail(value),
      message: "Invalid email address",
    },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
});

module.exports = mongoose.model("user", user);
