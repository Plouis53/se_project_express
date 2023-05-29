const errorCode400 = 400;
const errorCode404 = 404;
const errorCode500 = 500;

module.exports = {
  errorCode400,
  errorCode404,
  errorCode500,
};


const ERROR_CODE = 400;

if(err.name === 'SomeErrorName') return res.status(ERROR_CODE).send({ message: "Appropriate error message" })