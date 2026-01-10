const { BadRequestError, UnauthenticatedError } = require("../errors");
const user = require("../models/User");
const { StatusCodes } = require("http-status-codes");

const register = async (req, res, next) => {
  try {
    const newUser = await user.create({ ...req.body });
    const token = newUser.createJWT();
    res
      .status(StatusCodes.CREATED)
      .send({ user: { name: newUser.name }, token });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }
  const existingUser = await user.findOne({ email });
  if (!existingUser) {
    throw new UnauthenticatedError("Invalid Email");
  }
  const verifyPassword = await existingUser.verifyPassword(password);
  //console.log(verifyPassword);
  if (!verifyPassword) {
    throw new UnauthenticatedError("Invalid Password");
  }
  const token = existingUser.createJWT();
  res.status(StatusCodes.OK).json({ user: { name: existingUser.name }, token });
};

module.exports = { register, login };
