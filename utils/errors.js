const errorStatusCodes = {
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  conflict: 409,
  internalServerError: 500,
  mongoError: 11000,
};

const handleOnFailError = () => {
  const error = new Error("No item found");
  error.statusCode = errorStatusCodes.notFound;
  throw error;
};

const handleErrorResponse = (err, res) => {
  console.log(err);
  if (err.name === "ValidationError" || err.name === "CastError") {
    res
      .status(errorStatusCodes.badRequest)
      .send({ message: "Bad Request, Invalid input" });
  } else if (err.message === "Incorrect email or password") {
    res
      .status(errorStatusCodes.unauthorized)
      .send({ message: "You are not authorized to do this" });
  } else if (err.statusCode === errorStatusCodes.notFound) {
    res.status(errorStatusCodes.notFound).send({ message: "Item not found" });
  } else if (err.code === errorStatusCodes.mongoError) {
    res.status(errorStatusCodes.conflict).send({
      message: "Email address is already being used, please try another email.",
    });
  } else {
    res
      .status(errorStatusCodes.internalServerError)
      .send({ message: "Something went wrong" });
  }
};

module.exports = {
  errorStatusCodes,
  handleOnFailError,
  handleErrorResponse,
};
