const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { handleErrorResponse } = require("../utils/errors");
const { UnauthorizedError } = require("../errors/unauthorized-error");

module.exports.authorization = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      // res
      //   .status(errorStatusCodes.unauthorized)
      //   .send({ message: "Unauthorized" });

      next(new UnauthorizedError("Authorization required"));
      return;
      console.logs()
    }

    const token = authorization.replace("Bearer ", "");
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (err) {
      // res
      //   .status(errorStatusCodes.unauthorized)
      //   .send({ message: "Unauthorized, invalid token" });

      next(new UnauthorizedError("Authorization required"));
      return;
    }

    req.user = payload;
    next();
  } catch (err) {
    handleErrorResponse(err, res);
  }
};
