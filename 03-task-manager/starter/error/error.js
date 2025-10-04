class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const customAPIError = (msg, statusCode) => {
  return new ErrorHandler(msg, statusCode);
};

module.exports = { customAPIError, ErrorHandler };
