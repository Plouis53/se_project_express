const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { errorStatusCodes, handleErrorResponse } = require("../utils/errors");

module.exports.authorization = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      res
        .status(errorStatusCodes.unauthorized)
        .send({ message: "Unauthorized" });
      return;
    }

    const token = authorization.replace("Bearer ", "");
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      res
        .status(errorStatusCodes.unauthorized)
        .send({ message: "Unauthorized, invalid token" });
      return;
    }

    req.user = payload;
    next();
  } catch (err) {
    handleErrorResponse(err, res);
  }
};
