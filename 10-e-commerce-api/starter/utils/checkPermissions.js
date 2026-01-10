const CustomError = require("../errors");

const checkPermissions = (requestedUser, targetUser) => {
  if (requestedUser.userRole === "admin") return;
  if (requestedUser.userId === targetUser._id.toString()) return;
  throw new CustomError.UnauthorizedError("No Permission to access this route");
};

module.exports = checkPermissions;
