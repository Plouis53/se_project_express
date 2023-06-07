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

const handleErrorResponse = (error, res) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    res
      .status(errorStatusCodes.badRequest)
      .send({ message: "Bad Request, Invalid input" });
  } else if (error.message === "Incorrect email or password") {
    res
      .status(errorStatusCodes.unauthorized)
      .send({ message: "You are not authorized to do this" });
  } else if (error.statusCode === errorStatusCodes.notFound) {
    res.status(errorStatusCodes.notFound).send({ message: "Item not found" });
  } else if (error.code === errorStatusCodes.mongoError) {
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

// const ERROR_400 = 400;
// const ERROR_401 = 401;
// const ERROR_403 = 403;
// const ERROR_404 = 404;
// const ERROR_409 = 409;
// const ERROR_500 = 500;
// const ERROR_1100 = 1100;

// module.exports = {
//   ERROR_400,
//   ERROR_401,
//   ERROR_403,
//   ERROR_404,
//   ERROR_409,
//   ERROR_500,
//   ERROR_1100,
//   handleItemError,
//   handleError,
// };

// const handleItemError = () => {
//   const error = new Error("No item found");
//   error.status (ERROR_404);
//   throw error;
// };

// const handleError = (err, res) => {
//   if (err.name === "ValidationError" || err.name === "CastError") {
//     res.status(ERROR_400).send({ message: "Bad Request, Invalid input" });
//   } else if (err.message === "Incorrect email or password") {
//     res
//       .status(ERROR_401)
//       .send({ message: "You are not authorized to do this" });
//   } else if (err.statusCode === ERROR_404) {
//     res.status(ERROR_404).send({ message: "Item not found" });
//   } else if (err.code === ERROR_1100) {
//     res.status(ERROR_409).send({
//       message: "Email address is already being used, please try another email.",
//     });
//   } else {
//     res.status(ERROR_500).send({ message: "Something went wrong" });
//   }
// };

// const ERROR_CODES = {
//   BadRequest: 400,
//   Unauthorized: 401,
//   Forbidden: 403,
//   NotFound: 404,
//   AlreadyExistsError: 409,
//   DefaultError: 500,
//   MongoError: 11000,
// };
