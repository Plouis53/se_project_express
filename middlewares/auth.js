const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const { errorStatusCodes, handleError } = require("../utils/errors");

module.exports.authorization = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      res.status(errorStatusCodes.unauthorized).send({ error: "Unauthorized" });
      return;
    }

    const token = authorization.replace("Bearer ", "");
    let payload;

    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      res.status(errorStatusCodes.unauthorized).send({ error: "Unauthorized" });
      return;
    }

    req.user = payload;
    next();
  } catch (error) {
    handleError(error, res);
  }
};
