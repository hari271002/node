require("dotenv").config();
const { StatusCodes } = require("http-status-codes");
const User = require("../models/Users");
const customError = require("../errors");
const {
  createTokenUser,
  attachCookiesToResponse,
  asyncHandler,
} = require("../utils");

const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const firstRegisterUser = (await User.countDocuments({})) === 0;
  const role = firstRegisterUser ? "admin" : "user";
  const createdUser = await User.create({ name, email, password, role });
  const payload = createTokenUser(createdUser);
  attachCookiesToResponse(res, payload);
  res.status(StatusCodes.OK).json({ userDetails: payload });
});

const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new customError.BadRequestError(
      "Email and passoword are required fields"
    );
  }
  const validEmail = await User.findOne({ email });
  if (!validEmail) {
    throw new customError.UnauthenticatedError(
      "Email is not registered, please register"
    );
  }
  const validPassword = await validEmail.comparePassword(password);
  if (!validPassword) {
    throw new customError.UnauthenticatedError(
      "Password is incorrect, please enter the correct password"
    );
  }
  const payload = createTokenUser(validEmail);
  attachCookiesToResponse(res, payload);
  res.status(StatusCodes.OK).json({ userDetails: payload });
});

const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "loggedOut", {
    httpOnly: true,
    expires: new Date(Date.now() + 5000),
  });
  res.status(StatusCodes.OK).json({ msg: "User logged out successfully" });
});

module.exports = { register, login, logout };
