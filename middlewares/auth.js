const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { UnauthorizedError } = require("../errors/unauthorized-error");

module.exports.authorization = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      next(new UnauthorizedError("Authorization required"));
      return;
    }

    const token = authorization.replace("Bearer ", "");
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      next(new UnauthorizedError("Authorization required"));
      return;
    }

    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};
