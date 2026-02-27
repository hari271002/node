const customError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;
  if (!token) {
    throw new customError.BadRequestError("Token is required");
  }
  try {
    const validToken = isTokenValid(token);
    const userName = validToken.userName;
    const userRole = validToken.userRole;
    const userId = validToken.userId;
    req.user = { userName, userRole, userId };
    next();
  } catch (err) {
    next(err);
  }
};
const authorizePermission = (...roles) => {
  return function (req, res, next) {
    if (!roles.includes(req.user.userRole)) {
      throw new customError.UnauthorizedError(
        "No Permission to access this route"
      );
    }
    next();
  };
};
module.exports = { authenticateUser, authorizePermission };
