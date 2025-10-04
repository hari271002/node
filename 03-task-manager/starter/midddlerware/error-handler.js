const { ErrorHandler } = require("../error/error");
const errorHandler = (err, req, res, next) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({ message: "something is wrong" });
};

module.exports = errorHandler;
