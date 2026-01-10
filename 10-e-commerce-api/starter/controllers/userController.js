const userModel = require("../models/Users");
const { StatusCodes } = require("http-status-codes");
const CustomerError = require("../errors");
const {
  attachCookiesToResponse,
  createTokenUser,
  checkPermissions,
  asyncHandler,
} = require("../utils");

const getAllUsers = asyncHandler(async (req, res, next) => {
  const user = await userModel.find({ role: "user" }).select("-password");
  res.status(StatusCodes.OK).json({ user });
});
const getOneUser = asyncHandler(async (req, res, next) => {
  const user = await userModel
    .findOne({ _id: req.params.id })
    .select("-password");
  if (!user) {
    throw new CustomerError.NotFoundError(
      `No user with provided Id - ${req.params.id}`
    );
  }
  checkPermissions(req.user, user._id);
  res.status(StatusCodes.OK).json({ user });
});
const showCurrentUser = asyncHandler(async (req, res, next) => {
  res.status(StatusCodes.OK).json({ user: req.user });
});
const updateUser = asyncHandler(async (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    throw new CustomerError.BadRequestError(
      "Name and Email are required fields"
    );
  }
  const updatedUser = await userModel.findById({ _id: req.user.userId });
  updatedUser.email = email;
  updatedUser.name = name;
  await updatedUser.save();
  const payload = createTokenUser(updatedUser);
  attachCookiesToResponse(res, payload);
  res.status(StatusCodes.OK).send({ user: payload });
});
const updateUserPassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new CustomerError.BadRequestError(
      "Old password and new password are required fields"
    );
  }
  const user = await userModel.findById({ _id: req.user.userId });
  const isValidPassword = user.comparePassword(oldPassword);
  if (!isValidPassword) {
    throw new CustomerError.UnauthenticatedError("Invalid Credentilas");
  }
  await user.save();
  res
    .status(StatusCodes.ACCEPTED)
    .json({ msg: "Password is updated successfully" });
});

module.exports = {
  getAllUsers,
  getOneUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
